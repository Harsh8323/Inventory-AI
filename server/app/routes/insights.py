from fastapi import APIRouter
from fastapi import HTTPException
from .upload import get_data
import pandas as pd
import os
import google.generativeai as genai

router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY", ""))

FALLBACK_INSIGHTS = [
    {"title": "Sales Performance", "description": "Review top-performing products to optimize inventory allocation."},
    {"title": "Demand Patterns", "description": "Monitor daily sales trends to identify seasonal fluctuations."},
    {"title": "Inventory Health", "description": "Maintain optimal stock levels to prevent both overstock and stockouts."},
    {"title": "Forecast Accuracy", "description": "Use prediction data to plan procurement schedules effectively."},
    {"title": "Risk Management", "description": "Prioritize replenishment for high-demand, low-inventory products."}
]

@router.get("/insights")
def get_insights():
    try:
        df = get_data()
    except HTTPException:
        return FALLBACK_INSIGHTS

    total_sales = int(df['sales'].sum())
    avg_daily = round(df.groupby('date')['sales'].sum().mean(), 2)
    top_product = df.groupby('product')['sales'].sum().idxmax()
    top_sales = int(df.groupby('product')['sales'].sum().max())

    trend_data = df.groupby('date')['sales'].sum()
    if len(trend_data) > 7:
        recent = trend_data.tail(7).mean()
        previous = trend_data.head(7).mean()
        trend = "increasing" if recent > previous else "decreasing"
    else:
        trend = "stable"

    prompt = f"""Based on this inventory data analysis:
- Total Sales: {total_sales}
- Average Daily Sales: {avg_daily}
- Top Product: {top_product} with {top_sales} units
- Recent Sales Trend: {trend}

Provide 5 concise business insights for inventory management. Keep each insight to one sentence. Format as JSON array with 'title' and 'description' fields only."""

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        
        insights_text = response.text.strip()
        
        if insights_text.startswith('['):
            import json
            insights = json.loads(insights_text)
            return insights[:5]
    except Exception:
        pass

    return FALLBACK_INSIGHTS