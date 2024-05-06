from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from deep_translator import MyMemoryTranslator, GoogleTranslator
from starlette.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_root(request: Request):
    data = request.url.scheme + "://" + request.headers["host"]
    return templates.TemplateResponse("index.html", {"request": request, "data": data})

@app.post("/translate")
async def translate(request: dict):
    if 'text' not in request or not isinstance(request['text'], str) or 'type' not in request:
        raise JSONResponse(status_code=400, detail="Invalid JSON format. Expected format: {'text': 'some_text', 'type': 'some_type'}")
    
    text = request['text']
    translation_type = request['type']
    
    if translation_type == 'Chinese':
        translated_en = MyMemoryTranslator(source='zh-TW', target='en-GB').translate(text)
        translated_th = GoogleTranslator(source='en', target='th').translate(translated_en)
        translated_tw = GoogleTranslator(source='th', target='zh-TW').translate(translated_th)
    elif translation_type == 'Thai':
        translated_en = MyMemoryTranslator(source='th-TH', target='en-GB').translate(text)
        translated_tw = GoogleTranslator(source='en', target='zh-TW').translate(translated_en)
        translated_th = GoogleTranslator(source='zh-TW', target='th').translate(translated_tw)
    elif translation_type == 'English':
        translated_tw = GoogleTranslator(source='en', target='zh-TW').translate(text)
        translated_th = GoogleTranslator(source='en', target='th').translate(text)
        translated_en = text
    else:
        raise JSONResponse(status_code=400, detail="Invalid translation type. Supported types are 'Chinese', 'Thai', and 'English'.")

    return {"translated_tw": translated_tw, "translated_en": translated_en, "translated_th": translated_th}

# python -m uvicorn main:app --reload
# http://127.0.0.1:8000/
