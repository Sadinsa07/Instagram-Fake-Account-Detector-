from fastapi import FastAPI, HTTPException
from app.schemas.request import UsernameInput, AccountFeaturesInput
from app.services.prediction import predict_from_features
from app.services.instagram_scraper import extract_instagram_features
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Instagram Fake Account Detector")

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Instagram Fake Account Detector API"}

@app.post("/predict/username")
def predict_by_username(payload: UsernameInput):
    features = extract_instagram_features(payload.username)
    if features is None:
        raise HTTPException(status_code=404, detail="Username not found or private.")
    prediction = predict_from_features(features)
    return {"username": payload.username, "prediction": prediction}

@app.post("/predict/features")
def predict_by_features(payload: AccountFeaturesInput):
    prediction = predict_from_features(payload.dict())
    return {"prediction": prediction}
