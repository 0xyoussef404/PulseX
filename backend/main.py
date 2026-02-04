from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pathlib import Path
import shutil
import uuid
from datetime import datetime
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = FastAPI(
    title="PulseX Medical API",
    description="AI-Powered X-ray Analysis + Secure ECG Storage",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup directories
BASE_DIR = Path(__file__).parent
UPLOAD_DIR = BASE_DIR / "uploads"
ECG_DIR = UPLOAD_DIR / "ecg"
XRAY_TEMP_DIR = UPLOAD_DIR / "xray_temp"

for folder in [ECG_DIR, XRAY_TEMP_DIR]:
    folder.mkdir(parents=True, exist_ok=True)

# Initialize X-ray service
try:
    from services.xray_service import XRayService
    xray_service = XRayService()
    print("✅ X-ray Service loaded successfully.")
except Exception as e:
    print(f"❌ Error: {e}")
    xray_service = None

# ENDPOINTS
@app.get("/", tags=["System"])
async def root():
    return {
        "service": "PulseX Medical API",
        "status": "operational",
        "version": "2.0.0",
        "endpoints": ["/api/xray/analyze", "/api/ecg/upload", "/health"]
    }

@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "xray_ai": "active" if xray_service else "inactive",
        "ecg_storage": "active"
    }

@app.post("/api/xray/analyze", tags=["X-ray Analysis"])
async def analyze_xray(file: UploadFile = File(...)):
    """Binary X-ray Analysis: Normal vs Abnormal"""
    if not xray_service:
        raise HTTPException(status_code=503, detail="X-ray AI not initialized")
    
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Invalid file type")

    file_id = str(uuid.uuid4())
    file_ext = Path(file.filename).suffix.lower()
    temp_path = XRAY_TEMP_DIR / f"{file_id}{file_ext}"

    try:
        await file.seek(0)
        image_bytes = await file.read()
        
        with open(temp_path, "wb") as buffer:
            buffer.write(image_bytes)
        
        result = xray_service.analyze_xray(image_bytes, file.filename)
        
        if temp_path.exists():
            temp_path.unlink()

        return {
            "success": True,
            "result": result,
            "timestamp": datetime.now().isoformat()
        }
    
    except Exception as e:
        if temp_path.exists(): 
            temp_path.unlink()
        raise HTTPException(status_code=500, detail=f"Analysis Error: {str(e)}")

@app.post("/api/ecg/upload", tags=["ECG Storage"])
async def upload_ecg(file: UploadFile = File(...)):
    """Upload ECG file for secure storage"""
    allowed_extensions = {'.png', '.jpg', '.jpeg', '.pdf'}
    file_ext = Path(file.filename).suffix.lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Only PNG, JPG, JPEG, PDF allowed")

    file_id = str(uuid.uuid4())
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_filename = f"ecg_{timestamp}_{file_id}{file_ext}"
    save_path = ECG_DIR / unique_filename

    try:
        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return {
            "success": True,
            "message": "ECG uploaded successfully",
            "file_info": {
                "filename": unique_filename,
                "path": f"uploads/ecg/{unique_filename}",
                "size_mb": round(save_path.stat().st_size / (1024 * 1024), 2),
                "timestamp": datetime.now().isoformat()
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload Error: {str(e)}")

@app.exception_handler(404)
async def not_found(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Not Found", "available": ["/api/xray/analyze", "/api/ecg/upload"]}
    )

@app.on_event("startup")
async def startup():
    print("=" * 70)
    print("PulseX Medical API v2.0.0")
    print("=" * 70)
    print(f"✓ X-ray AI: {'Active' if xray_service else 'Inactive'}")
    print(f"✓ ECG Storage: Active")
    print("=" * 70)