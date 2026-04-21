import shutil
import tempfile
from fastapi import UploadFile

def save_upload_file(upload_file: UploadFile) -> str:
    suffix = upload_file.filename.split(".")[-1]
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=f".{suffix}")

    with tmp as buffer:
        shutil.copyfileobj(upload_file.file, buffer)

    return tmp.name