import joblib
import os
from app.config import MODEL_PATH

model = joblib.load(MODEL_PATH)
feature_columns = model.feature_names_in_
