import whisper
from app.config import settings

_model = None

def get_model():
    global _model
    if _model is None:
        _model = whisper.load_model(settings.WHISPER_MODEL, device=settings.DEVICE)
    return _model


def transcribe(file_path: str):
    model = get_model()

    result = model.transcribe(
        file_path,
        verbose=False,
        fp16=(settings.DEVICE == "cuda"),
    )

    return result