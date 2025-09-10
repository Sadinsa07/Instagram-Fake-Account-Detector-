# instafake_detector.py

import numpy as np
import pandas as pd
import json
import os
import joblib
import warnings
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, auc, precision_recall_curve
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier, AdaBoostClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from xgboost import XGBClassifier
from imblearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE

warnings.filterwarnings('ignore')


def load_data(real_path, fake_path):
    with open(real_path, 'r') as f:
        real_data = json.load(f)
    with open(fake_path, 'r') as f:
        fake_data = json.load(f)

    real_df = pd.DataFrame(real_data)
    fake_df = pd.DataFrame(fake_data)
    combined_df = pd.concat([real_df, fake_df], ignore_index=True)
    return combined_df.sample(frac=1, random_state=42).reset_index(drop=True)


def engineer_features(df):
    df['followers_following_ratio'] = df['userFollowerCount'] / (df['userFollowingCount'] + 1)
    df['followers_media_ratio'] = df['userFollowerCount'] / (df['userMediaCount'] + 1)
    df['username_digit_ratio'] = df['usernameDigitCount'] / (df['usernameLength'] + 1)
    return df


def visualize_data(df):
    plt.figure(figsize=(12, 6))
    sns.countplot(data=df, x='isFake', palette='Set2')
    plt.title('Class Distribution (Real vs Fake)')
    plt.show()

    plt.figure(figsize=(12, 6))
    sns.histplot(df['userFollowerCount'], kde=True, color='blue')
    plt.title('Distribution of User Followers Count')
    plt.show()

    plt.figure(figsize=(12, 6))
    sns.histplot(df['userFollowingCount'], kde=True, color='green')
    plt.title('Distribution of User Following Count')
    plt.show()

    corr = df.corr()
    plt.figure(figsize=(12, 8))
    sns.heatmap(corr, annot=True, cmap='coolwarm', fmt='.2f', linewidths=0.5)
    plt.title('Correlation Heatmap of Features')
    plt.show()


def create_models():
    return {
        'RandomForest': RandomForestClassifier(random_state=42),
        'GradientBoosting': GradientBoostingClassifier(random_state=42),
        'XGBoost': XGBClassifier(random_state=42, use_label_encoder=False, eval_metric='logloss'),
        'SVM': SVC(probability=True, random_state=42),
        'LogisticRegression': LogisticRegression(random_state=42),
        'KNeighbors': KNeighborsClassifier(),
        'AdaBoost': AdaBoostClassifier(random_state=42)
    }


param_grids = {
    'RandomForest': {
        'classifier__n_estimators': [100],
        'classifier__max_depth': [10],
        'classifier__min_samples_split': [2]
    },
    'GradientBoosting': {
        'classifier__n_estimators': [100],
        'classifier__learning_rate': [0.1]
    },
    'XGBoost': {
        'classifier__n_estimators': [100],
        'classifier__max_depth': [3],
        'classifier__learning_rate': [0.1]
    },
    'SVM': {
        'classifier__C': [1.0],
        'classifier__kernel': ['rbf']
    },
    'LogisticRegression': {
        'classifier__C': [1.0]
    },
    'KNeighbors': {
        'classifier__n_neighbors': [5]
    },
    'AdaBoost': {
        'classifier__n_estimators': [50]
    }
}


def plot_roc_curves(models, X_test, y_test):
    plt.figure(figsize=(12, 8))
    for name, model in models.items():
        y_pred_proba = model.predict_proba(X_test)[:, 1]
        fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
        roc_auc = auc(fpr, tpr)
        plt.plot(fpr, tpr, label=f'{name} (AUC = {roc_auc:.2f})')

    plt.plot([0, 1], [0, 1], 'k--')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curves')
    plt.legend()
    plt.show()


def plot_precision_recall_curve(models, X_test, y_test):
    plt.figure(figsize=(12, 8))
    for name, model in models.items():
        y_pred_proba = model.predict_proba(X_test)[:, 1]
        precision, recall, _ = precision_recall_curve(y_test, y_pred_proba)
        plt.plot(recall, precision, label=f'{name}')

    plt.xlabel('Recall')
    plt.ylabel('Precision')
    plt.title('Precision-Recall Curves')
    plt.legend()
    plt.show()


def predict_account(model, features, account_data):
    account_df = pd.DataFrame([account_data])
    account_df = engineer_features(account_df)
    for col in features:
        if col not in account_df.columns:
            account_df[col] = 0
    prediction = model.predict(account_df[features])
    return prediction


def main():
    print("Loading data...")
    df = load_data('input/realAccountData.json', 'input/fakeAccountData.json')

    visualize_data(df)
    df = engineer_features(df)

    X = df.drop('isFake', axis=1)
    y = df['isFake']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,
                                                        random_state=42, stratify=y)

    models = create_models()
    best_models = {}

    for name, model in models.items():
        print(f"\nTraining {name}...")

        pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('smote', SMOTE(random_state=42)),
            ('classifier', model)
        ])

        grid_search = GridSearchCV(pipeline, param_grids[name], cv=5, n_jobs=-1,
                                   scoring='roc_auc')
        grid_search.fit(X_train, y_train)

        best_models[name] = grid_search.best_estimator_
        y_pred = grid_search.predict(X_test)
        print(f"\nBest parameters: {grid_search.best_params_}")
        print(f"\nClassification Report for {name}:\n{classification_report(y_test, y_pred)}")

    plot_roc_curves(best_models, X_test, y_test)
    plot_precision_recall_curve(best_models, X_test, y_test)

    voting_clf = VotingClassifier(
        estimators=[(name, model) for name, model in best_models.items()],
        voting='soft'
    )
    voting_clf.fit(X_train, y_train)

    y_pred_ensemble = voting_clf.predict(X_test)
    print("\nEnsemble Model Performance:")
    print(classification_report(y_test, y_pred_ensemble))

    cm = confusion_matrix(y_test, y_pred_ensemble)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=['Real', 'Fake'], yticklabels=['Real', 'Fake'])
    plt.title('Confusion Matrix - Ensemble Model')
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.show()

    joblib.dump(voting_clf, 'instagram_fake_detector.joblib')
    print("\nModel saved as 'instagram_fake_detector.joblib'")

    return voting_clf, X.columns


if __name__ == "__main__":
    best_model, feature_columns = main()

    # Example usage
    new_account_data = {
        'userFollowerCount': 200,
        'userFollowingCount': 180,
        'userMediaCount': 30,
        'usernameDigitCount': 5,
        'usernameLength': 15
    }

    prediction = predict_account(best_model, feature_columns, new_account_data)
    print(f"\nPrediction for new account (1=Fake, 0=Real): {prediction[0]}")
