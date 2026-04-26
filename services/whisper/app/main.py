import os
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from faster_whisper import WhisperModel
from pydantic import BaseModel, HttpUrl


class TranscribeRequest(BaseModel):
    audioUrl: HttpUrl


class Segment(BaseModel):
    startMs: int
    endMs: int
    text: str


class TranscribeResponse(BaseModel):
    text: str
    language: Optional[str] = None
    durationSeconds: Optional[int] = None
    segments: List[Segment]


model_size = os.getenv("WHISPER_MODEL_SIZE", "small")
compute_type = os.getenv("WHISPER_COMPUTE_TYPE", "int8")
device = os.getenv("WHISPER_DEVICE", "auto")

app = FastAPI(title="lume-whisper", version="0.1.0")
model = WhisperModel(model_size, device=device, compute_type=compute_type)


@app.get("/health")
def health():
    return {"ok": True, "model": model_size}


@app.post("/transcribe", response_model=TranscribeResponse)
def transcribe(req: TranscribeRequest):
    try:
        segments_iter, info = model.transcribe(
            str(req.audioUrl),
            vad_filter=True,
            beam_size=5,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"transcription failed: {exc}") from exc

    transcript_segments: List[Segment] = []
    text_parts: List[str] = []
    max_end_seconds = 0.0

    for segment in segments_iter:
        text = segment.text.strip()
        start_ms = max(0, int(round(segment.start * 1000)))
        end_ms = max(0, int(round(segment.end * 1000)))
        transcript_segments.append(Segment(startMs=start_ms, endMs=end_ms, text=text))
        if text:
            text_parts.append(text)
        if segment.end > max_end_seconds:
            max_end_seconds = segment.end

    duration_seconds = int(round(max_end_seconds)) if max_end_seconds > 0 else None
    return TranscribeResponse(
        text=" ".join(text_parts).strip(),
        language=getattr(info, "language", None),
        durationSeconds=duration_seconds,
        segments=transcript_segments,
    )
