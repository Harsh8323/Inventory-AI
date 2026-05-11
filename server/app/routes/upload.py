from fastapi import APIRouter, UploadFile, File, HTTPException
from datetime import datetime
import pandas as pd
import io

router = APIRouter()

global_data = {"df": None, "filename": None}

REQUIRED_COLUMNS = {"date", "product", "sales", "inventory"}

@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are accepted")

    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid CSV format")

    if df.empty:
        raise HTTPException(status_code=400, detail="CSV file is empty")

    df.columns = df.columns.str.lower().str.strip()

    if not REQUIRED_COLUMNS.issubset(set(df.columns)):
        missing = REQUIRED_COLUMNS - set(df.columns)
        raise HTTPException(status_code=400, detail=f"Missing columns: {', '.join(missing)}")

    try:
        df['date'] = pd.to_datetime(df['date'])
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid date format in 'date' column")

    df['sales'] = pd.to_numeric(df['sales'], errors='coerce')
    df['inventory'] = pd.to_numeric(df['inventory'], errors='coerce')

    if df['sales'].isna().any() or df['inventory'].isna().any():
        raise HTTPException(status_code=400, detail="Non-numeric values found in sales or inventory columns")

    global_data["df"] = df
    global_data["filename"] = file.filename

    return {
        "success": True,
        "rows": len(df),
        "products": df['product'].nunique(),
        "date_range": {
            "start": df['date'].min().strftime('%Y-%m-%d'),
            "end": df['date'].max().strftime('%Y-%m-%d')
        }
    }

def get_data():
    if global_data["df"] is None:
        raise HTTPException(status_code=400, detail="No dataset uploaded. Please upload a CSV file first.")
    return global_data["df"]