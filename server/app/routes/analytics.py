from fastapi import APIRouter
from fastapi import HTTPException
from .upload import get_data
import pandas as pd

router = APIRouter()

@router.get("/analytics")
def get_analytics():
    df = get_data()
    return {
        "total_sales": int(df['sales'].sum()),
        "average_daily_sales": round(df.groupby('date')['sales'].sum().mean(), 2),
        "top_product": df.groupby('product')['sales'].sum().idxmax(),
        "lowest_inventory_product": df.groupby('product')['inventory'].mean().idxmin(),
        "total_products": df['product'].nunique()
    }

@router.get("/analytics/sales-trend")
def get_sales_trend():
    df = get_data()
    daily_sales = df.groupby('date')['sales'].sum().reset_index()
    daily_sales.columns = ['date', 'sales']
    daily_sales['date'] = daily_sales['date'].dt.strftime('%Y-%m-%d')
    return daily_sales.to_dict('records')

@router.get("/analytics/product-distribution")
def get_product_distribution():
    df = get_data()
    distribution = df.groupby('product')['sales'].sum().reset_index()
    distribution.columns = ['product', 'sales']
    return distribution.to_dict('records')