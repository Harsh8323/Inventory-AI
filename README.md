# StockPilot

Full-stack web app for **inventory demand forecasting**: upload sales CSV data, view analytics and charts, run simple linear-regression forecasts, get stock-risk alerts, and optional AI insights (Google Gemini).

## Features

- **Landing** — Marketing-style entry with links into the app  
- **Upload** — CSV validation (`date`, `product`, `sales`, `inventory`)  
- **Dashboard** — KPIs, sales trend, product mix, inventory distribution  
- **Forecast** — Per-product 7-day demand forecast  
- **Alerts** — Shortage risk vs predicted weekly demand  
- **Insights** — Gemini-powered recommendations (requires API key)  
- **Themes** — Light (warm neutrals + forest green) and dark (neon lime) toggle, persisted in the browser

## Tech stack

| Layer    | Stack                                      |
| -------- | ------------------------------------------ |
| Frontend | React 18, Vite 5, React Router, Tailwind 4, Recharts, Axios |
| Backend  | FastAPI, Uvicorn, Pandas, NumPy, scikit-learn, `google-generativeai` |

## Repository layout

```
StockPilot/
├── client/          # Vite + React SPA
│   └── src/
├── server/          # FastAPI app (`app/main.py`)
│   ├── demo_inventory_data.csv
│   └── requirements.txt
└── README.md
```

## Prerequisites

- **Node.js** 18+ (for `npm`)  
- **Python 3.11 or 3.12 (64-bit)** recommended for the backend (wheels for Pandas/NumPy; avoid 32-bit or very new Python if builds fail)  
- **Git** (optional)

## Backend setup

From the `server` directory:

```bash
cd server
python -m venv .venv
```

**Windows (PowerShell):**

```powershell
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

**macOS / Linux:**

```bash
source .venv/bin/activate
pip install -r requirements.txt
```

### Environment (optional)

Create `server/.env` if you use Gemini insights (never commit real keys):

```env
GEMINI_API_KEY=your_key_here
```

## Frontend setup

From the `client` directory:

```bash
cd client
npm install
```

Optional: point the UI at a non-default API (e.g. deployed backend):

```env
# client/.env.local
VITE_API_URL=http://localhost:8000/api
```

Default in code is `http://localhost:8000/api` if `VITE_API_URL` is unset.

## Run locally

Use **two terminals** — backend first, then frontend.

**Terminal 1 — API (from `server`):**

```powershell
cd server
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

**Terminal 2 — UI (from `client`):**

```bash
cd client
npm run dev
```

| Service   | URL                          |
| --------- | ---------------------------- |
| Frontend  | http://localhost:5173/       |
| API root  | http://127.0.0.1:8000/       |
| Health    | http://127.0.0.1:8000/api/health |

Upload `server/demo_inventory_data.csv` from the **Upload** page to try the full flow.

## Production build (frontend only)

```bash
cd client
npm run build
```

Static output is in `client/dist/`. Serve it with any static host; ensure `VITE_API_URL` (or reverse proxy) targets your live API and CORS is configured on the server if origins differ.

## Stopping dev servers

Press **Ctrl+C** in each terminal. On Windows, if a port is stuck:

```powershell
Get-NetTCPConnection -LocalPort 8000,5173 -State Listen -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

## License

Private / unlicensed unless you add a `LICENSE` file.

