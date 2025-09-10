import pandas as pd
from app.utils.feature_engineering import engineer_features
from app.models.model_loader import model, feature_columns

def predict_from_features(account_data: dict) -> str:
    """
    Predict account authenticity from account data and return 'real' or 'fake'.
    
    Args:
        account_data (dict): Dictionary containing account features.
    
    Returns:
        str: 'real' if the account is predicted genuine, 'fake' otherwise.
    """
    df = pd.DataFrame([account_data])
    df = engineer_features(df)
    
    # Ensure all required feature columns are present
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0
    
    # Predict using the model
    prediction = model.predict(df[feature_columns])[0]
    
    # Map binary prediction to 'real' or 'fake'
    return 'real' if prediction == 1 else 'fake'
