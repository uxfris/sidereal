import os

class Settings:
    WHISPER_MODEL = os.getenv("WHISPER_MODEL", "base")
    DEVICE = os.getenv("DEVICE", "cpu")  # "cuda" if GPU

settings = Settings()