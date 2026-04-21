from fastapi import FastAPI, UploadFile, File, HTTPException
from app.services.whisper import transcribe
from app.services.utils import save_upload_file
from app.schemas.response import TranscriptionResponse

app = FastAPI(title="Lume Whisper Service")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/transcribe", response_model=TranscriptionResponse)
async def transcribe_endpoint(file: UploadFile = File(...)):
    try:
        file_path = save_upload_file(file)

        result = transcribe(file_path)

        return {
            "text": result["text"],
            "language": result.get("language"),
            "segments": result.get("segments", []),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))