from fastapi import FastAPI

app = FastAPI()

@app.get("/api/python")
async def read_root():
    return {"message": "Hello World"}

# uvicorn api.main:app --reload --host 127.0.0.1 --port 8000

