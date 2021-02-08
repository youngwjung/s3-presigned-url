import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import boto3
import requests


region = requests.get('http://169.254.169.254/latest/meta-data/placement/region').text
bucket = BUCKET_NAME

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class S3Object(BaseModel):
    file_name: str


@app.get("/")
def root():
    return {"bucket_name": bucket}


@app.post("/upload")
def upload(object: S3Object):
    ## Boto3를 이용해서 파일 업로드에 사용할 미리 서명된 URL을 받아서 반환하세요. SDK에서 반환되는 응답을 그대로 반환하면 돱니다.
    key = object.file_name
    return response


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
