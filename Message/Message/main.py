from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List

app = FastAPI()


class Message(BaseModel):
    name: str
    text: str


messages: List[Message] = []


@app.post("/api/messages")
def post_message(msg: Message):
    messages.append(msg)
    return {"status": "success"}


@app.get("/api/messages")
def get_messages():
    return messages


app.mount("/",
          StaticFiles(directory="frontend/dist", html=True),
          name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
