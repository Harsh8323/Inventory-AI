from fastapi import APIRouter, Query
from fastapi import HTTPException
from .upload import get_data
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

router = APIRouter()

def get_forecast_for_product(product):
    df = get_data()
    product_data = df[df['product'].str.lower() == product.lower()]
    
    if product_data.empty:
        return None
    
    daily_sales = product_data.groupby('date')['sales'].sum().reset_index()
    daily_sales = daily_sales.sort_values('date')
    
    X = np.arange(len(daily_sales)).reshape(-1, 1)
    y = daily_sales['sales'].values
    
    model = LinearRegression()
    model.fit(X, y)
    
    future_avg = model.predict(np.array([[len(daily_sales)]]))[0]
    return max(future_avg, 0)

@router.get("/alerts")
def get_alerts():
    df = get_data()
    
    products = df['product'].unique()
    alerts = []
    
    for product in products:
        product_data = df[df['product'] == product]
        current_inventory = product_data['inventory'].mean()
        
        predicted_demand = get_forecast_for_product(product)
        if predicted_demand is None:
            continue
        
        predicted_weekly = predicted_demand * 7
        
        if predicted_weekly > current_inventory:
            risk = "High" if predicted_weekly > current_inventory * 2 else "Medium"
            
            alerts.append({
                "product": product,
                "inventory": round(current_inventory, 2),
                "predicted_demand": round(predicted_weekly, 2),
                "risk": risk
            })
    
    alerts = sorted(alerts, key=lambda x: x['predicted_demand'] - x['inventory'], reverse=True)
    
    return alerts