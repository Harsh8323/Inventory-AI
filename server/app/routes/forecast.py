from fastapi import APIRouter, Query
from fastapi import HTTPException
from .upload import get_data
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

router = APIRouter()

@router.get("/forecast")
def get_forecast(product: str = Query(...)):
    df = get_data()
    product_data = df[df['product'].str.lower() == product.lower()]

    if product_data.empty:
        raise HTTPException(status_code=404, detail=f"Product '{product}' not found")

    daily_sales = product_data.groupby('date')['sales'].sum().reset_index()
    daily_sales = daily_sales.sort_values('date')

    dates = pd.date_range(start=daily_sales['date'].min(), end=daily_sales['date'].max())
    full_dates = pd.DataFrame({'date': dates})
    daily_sales = full_dates.merge(daily_sales, on='date', how='left').fillna(0)

    X = np.arange(len(daily_sales)).reshape(-1, 1)
    y = daily_sales['sales'].values

    model = LinearRegression()
    model.fit(X, y)

    last_idx = len(daily_sales) - 1
    future_indices = np.arange(last_idx + 1, last_idx + 8).reshape(-1, 1)
    forecast = model.predict(future_indices)
    forecast = np.maximum(forecast, 0)

    last_date = daily_sales['date'].max()
    future_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=7)

    historical = daily_sales[['date', 'sales']].to_dict('records')
    for item in historical:
        item['date'] = item['date'].strftime('%Y-%m-%d') if hasattr(item['date'], 'strftime') else str(item['date'])

    forecast_data = [
        {"date": d.strftime('%Y-%m-%d'), "sales": round(float(s), 2)}
        for d, s in zip(future_dates, forecast)
    ]

    return {
        "product": product,
        "historical": historical,
        "forecast": forecast_data
    }

@router.get("/forecast/products")
def get_products():
    df = get_data()
    products = df['product'].unique().tolist()
    return {"products": products}