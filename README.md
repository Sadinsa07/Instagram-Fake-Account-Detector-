
# Detecting Fake Instagram Accounts

## Overview
This project aims to detect fake Instagram accounts using machine learning algorithms. By analyzing publicly available metadata, we can classify Instagram accounts as either real or fake. The project involves data collection, preprocessing, feature engineering, and the training of several machine learning models. The best-performing model is then deployed to predict whether Instagram accounts are real or fake.

## Key Features
- **Data Collection**: The project uses a publicly available dataset consisting of real and fake Instagram account metadata.
- **Feature Engineering**: Features such as follower/following ratios, media counts, and username digit ratios were engineered to improve model performance.
- **Model Training**: Multiple machine learning algorithms, including Random Forest, XGBoost, and SVM, were trained to detect fake accounts.
- **Model Evaluation**: Various evaluation metrics such as accuracy, precision, recall, and F1-score were used to assess model performance.
- **Deployment**: The best-performing model was deployed using **Joblib** for real-time predictions in a web interface.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Model Evaluation](#model-evaluation)
- [Deployment](#deployment)
- [Future Work](#future-work)
- [Acknowledgments](#acknowledgments)

## Getting Started
This project detects fake Instagram accounts using machine learning models trained on account metadata.

### Prerequisites
- Python 3.9 or higher
- Required libraries: `pandas`, `scikit-learn`, `joblib`, `SMOTE`, `XGBoost`, `matplotlib`

### Backend Dependencies
- Joblib
- Scikit-learn
- XGBoost

## Installation

### Backend Setup
1. Install the required Python libraries:
   ```bash
   pip install pandas scikit-learn xgboost joblib imbalanced-learn matplotlib
   ```

## Usage
1. Load the data:
   ```python
   real_data = load_data("real_data.json", "fake_data.json")
   ```
2. Train the model:
   ```python
   model = train_model(real_data)
   ```
3. Use the model for predictions:
   ```python
   prediction = model.predict(new_account_data)
   ```

## Model Evaluation
The models were evaluated using the following metrics:
- **Accuracy**: Overall correctness of the model.
- **Precision**: Correctness of fake account predictions.
- **Recall**: The model's ability to identify fake accounts.
- **F1-Score**: A balance between precision and recall.
- **ROC-AUC**: Performance evaluation across various thresholds.

### Model Performance
The ensemble model, combining multiple classifiers, achieved a high recall rate (~95%) with a precision rate of 86%, indicating that it effectively detects fake accounts while minimizing false positives.

## Deployment
- The best-performing model was saved using **Joblib** and can be loaded for inference.
- The model is deployed through a simple web interface that allows users to input Instagram account data and receive a classification (real or fake).

## Future Work
- **Deep Learning Models**: Incorporate neural networks for image-based detection.
- **Cross-Platform Support**: Extend the model to other social media platforms.
- **Real-Time Monitoring**: Develop a real-time fake account detection system using continuous data updates.
- **Explainability**: Use tools like SHAP or LIME to improve model transparency.

## Acknowledgments
- **Dataset**: The dataset was sourced from Kaggle's "Instafake" dataset, designed for research on fake Instagram account detection.
- **Libraries**: This project uses several powerful libraries, including **XGBoost**, **scikit-learn**, and **imbalanced-learn**.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
