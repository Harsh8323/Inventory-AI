from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import upload, analytics, forecast, alerts, insights

app = FastAPI(title="AI Inventory Demand Forecasting System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(forecast.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")
app.include_router(insights.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "AI Inventory Demand Forecasting API"}

@app.get("/api/health")
def health():
    return {"status": "healthy"}