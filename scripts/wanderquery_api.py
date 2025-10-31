from fastapi import FastAPI, Query
import wanderquery_backend as backend
import json

# --- Initialize FastAPI App ---
app = FastAPI(
    title="WanderQuery API",
    description="Search flight routes using OpenFlights data",
    version="1.0.0"
)

# --- Root Route ---
@app.get("/")
def root():
    return {"message": "🌍 WanderQuery API is running"}

# --- Search Route ---
@app.get("/search")
def search(
    source: str = Query(..., description="Source city"),
    destination: str = Query(..., description="Destination city")
):
    """Search routes between two cities."""
    result_json = backend.search_routes(source, destination)
    return json.loads(result_json)

# --- List Cities Route ---
@app.get("/cities")
def list_cities():
    """Get all distinct cities from airports table."""
    db = backend.WanderQueryDB()
    query = "SELECT DISTINCT city FROM airports WHERE city IS NOT NULL ORDER BY city"
    cities = [row["city"] for row in db.fetch_query(query)]
    db.close()
    return {"count": len(cities), "cities": cities}
