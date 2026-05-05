import sys
import os
import warnings

# --- 1. FORCE TORCHCODEC DISABLE (The "Ghost" Mock) ---
# Blocks Pyannote/Torchaudio from attempting to load the broken CUDA-linked wheel
sys.modules['torchcodec'] = None 

# --- 2. SILENCE WARNINGS ---
warnings.filterwarnings("ignore", message=".*torchcodec is not installed correctly.*")
os.environ["PYTHONWARNINGS"] = "ignore"

import torch
import torchaudio
import pyannote.audio.core.task

import subprocess

import soundfile as sf

# --- 3. FIX FOR TORCH 2.6+ SECURITY (Safe Globals) ---
torch.serialization.add_safe_globals([
    pyannote.audio.core.task.Specifications,
    pyannote.audio.core.task.Resolution,
    pyannote.audio.core.task.Problem,
])

from typing import List, Optional
from fastapi import FastAPI, HTTPException
from faster_whisper import WhisperModel
from pydantic import BaseModel, HttpUrl
from pyannote.audio import Pipeline
import httpx

# --- Models & Schema ---

class TranscribeRequest(BaseModel):
    audioUrl: HttpUrl

class DiarizeRequest(BaseModel):
    audioUrl: HttpUrl

class Segment(BaseModel):
    startMs: int
    endMs: int
    text: str

class DiarizeSegment(BaseModel):
    speaker: str
    startMs: int
    endMs: int

class TranscribeResponse(BaseModel):
    text: str
    language: Optional[str] = None
    durationSeconds: Optional[int] = None
    segments: List[Segment]

class DiarizeResponse(BaseModel):
    segments: List[DiarizeSegment]

# --- Initialization ---

app = FastAPI(title="lume-whisper", version="0.1.0")

# Environment Config
model_size = os.getenv("WHISPER_MODEL_SIZE", "small")
compute_type = os.getenv("WHISPER_COMPUTE_TYPE", "int8")
device = "cpu"
hf_token = os.getenv("HF_TOKEN")

# Initialize Whisper
model = WhisperModel(model_size, device=device, compute_type=compute_type)

# Initialize Pyannote
diarize_pipeline = None
if hf_token:
    try:
        diarize_pipeline = Pipeline.from_pretrained(
            "pyannote/speaker-diarization-community-1",
            token=hf_token
        )
        diarize_pipeline.to(torch.device(device))
        print("Pyannote Pipeline loaded successfully.")
    except Exception as e:
        print(f"Failed to load Pyannote Pipeline: {e}")

# --- Helper Functions ---

async def download_audio(url: str, dest: str):
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Could not download audio from URL")
        with open(dest, "wb") as f:
            f.write(response.content)

# --- Endpoints ---

@app.get("/health")
def health():
    return {
        "ok": True, 
        "device": device,
        "whisper_model": model_size, 
        "diarize_ready": diarize_pipeline is not None
    }

@app.post("/transcribe", response_model=TranscribeResponse)
async def transcribe(req: TranscribeRequest):
    temp_file = f"temp_transcribe_{os.urandom(4).hex()}.wav"
    try:
        await download_audio(str(req.audioUrl), temp_file)
        
        segments_iter, info = model.transcribe(
            temp_file,
            vad_filter=True,
            beam_size=5,
        )

        transcript_segments = []
        text_parts = []
        max_end = 0.0

        for s in segments_iter:
            text_parts.append(s.text.strip())
            max_end = max(max_end, s.end)
            transcript_segments.append(Segment(
                startMs=int(s.start * 1000),
                endMs=int(s.end * 1000),
                text=s.text.strip()
            ))

        return TranscribeResponse(
            text=" ".join(text_parts),
            language=info.language,
            durationSeconds=int(max_end),
            segments=transcript_segments
        )
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)

@app.post("/diarize", response_model=DiarizeResponse)
async def diarize(req: DiarizeRequest):
    if not diarize_pipeline:
        raise HTTPException(status_code=503, detail="Diarization pipeline not initialized (check HF_TOKEN)")

    temp_file = f"temp_diarize_{os.urandom(4).hex()}.tmp" # Renamed to .tmp to reflect raw bytes
    normalized_file = f"norm_diarize_{os.urandom(4).hex()}.wav" # The true WAV file
    
    try:
        # 1. Download raw audio bytes
        await download_audio(str(req.audioUrl), temp_file)
        
        # 2. Normalize audio to 16kHz, Mono, 16-bit PCM WAV via system FFmpeg
        # This fixes any format (MP3, MP4, M4A) and prepares it perfectly for Pyannote
        subprocess.run([
            "ffmpeg", "-y", "-i", temp_file, 
            "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", 
            normalized_file
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        
        # 3. Explicitly load using the 'soundfile' backend to bypass torchcodec completely
        audio_data, sample_rate = sf.read(normalized_file, dtype='float32')

        # Soundfile returns shape (frames,) for mono. Pyannote expects (channels, frames).
        if audio_data.ndim == 1:
            audio_data = audio_data.reshape(1, -1)
        else:
            audio_data = audio_data.T
            
        waveform = torch.from_numpy(audio_data)
        
        # 4. Pass memory dictionary to bypass Pyannote's file loader
        audio_in_memory = {"waveform": waveform, "sample_rate": sample_rate}
        
        # Pyannote 4.0+ returns a DiarizeOutput wrapper
        diarization_output = diarize_pipeline(audio_in_memory)

        segments = []
        for turn, _, speaker in diarization_output.speaker_diarization.itertracks(yield_label=True):
            segments.append(DiarizeSegment(
                speaker=str(speaker),
                startMs=int(turn.start * 1000),
                endMs=int(turn.end * 1000)
            ))

        return DiarizeResponse(segments=segments)

    except subprocess.CalledProcessError as exc:
        print(f"FFmpeg Error: {exc}")
        raise HTTPException(status_code=400, detail="Could not decode the provided audio file. Ensure it is a valid audio format.")
    except Exception as exc:
        print(f"Runtime Error: {exc}")
        raise HTTPException(status_code=500, detail=f"Diarization error: {str(exc)}")
    finally:
        # Clean up both temporary files
        if os.path.exists(temp_file):
            os.remove(temp_file)
        if os.path.exists(normalized_file):
            os.remove(normalized_file)