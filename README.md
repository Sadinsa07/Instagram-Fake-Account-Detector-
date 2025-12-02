# 🔍 Instagram Fake Account Detector

<div align="center">

![Instagram Fake Account Detector](https://img.shields.io/badge/Instagram-Account%20Detector-E4405F?style=for-the-badge&logo=instagram&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Machine Learning](https://img.shields.io/badge/ML-Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

**An intelligent machine learning system to detect fake Instagram accounts with high accuracy using advanced feature engineering and a modern web interface.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#-usage)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)
  - [Making Predictions](#making-predictions)
- [API Documentation](#-api-documentation)
- [Machine Learning Model](#-machine-learning-model)
- [Project Structure](#-project-structure)
- [Features Explained](#-features-explained)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🌟 Overview

The **Instagram Fake Account Detector** is a full-stack machine learning application designed to identify potentially fake or spam Instagram accounts. Using sophisticated algorithms and real-time data analysis, this tool helps users verify account authenticity through two methods:

1. **Username Analysis**: Automatically scrapes public Instagram profile data
2. **Manual Feature Input**: Direct analysis using account metrics

The system leverages supervised machine learning trained on real and fake account datasets to provide instant predictions with detailed analytics.

---

## ✨ Features

### 🎯 Core Functionality

- **Dual Detection Modes**
  - 🔗 **By Username**: Automatic profile scraping and analysis
  - 📊 **By Features**: Manual input for detailed custom analysis
  
- **Real-Time Analysis**
  - Instant predictions (< 2 seconds)
  - Live Instagram profile data fetching
  - Comprehensive account metrics display

- **Advanced ML Features**
  - Follower-to-following ratio analysis
  - Follower-to-media ratio calculation
  - Username pattern recognition (digit analysis)
  - Multi-feature correlation analysis

### 🎨 User Interface

- **Modern, Responsive Design**
  - Beautiful gradient-based UI
  - Mobile-first responsive layout
  - Smooth animations with Framer Motion
  - Intuitive tab-based navigation

- **Interactive Results**
  - Color-coded predictions (Green: Real, Red: Fake)
  - Detailed account statistics
  - Visual feedback with icons
  - Error handling with user-friendly messages

### 🔧 Technical Features

- **RESTful API** with FastAPI
- **CORS-enabled** for cross-origin requests
- **Type-safe** with TypeScript and Pydantic
- **Scalable architecture** with modular components
- **Production-ready** with error handling and validation

---

## 🎬 Demo

### Username Detection
```
Input: @instagram_user123
Output: ⚠️ FAKE - High digit ratio and suspicious follower patterns
```

### Feature-Based Detection
```
Input: 
- Followers: 150
- Following: 5000
- Posts: 3
- Username Digits: 8
- Username Length: 15

Output: ⚠️ FAKE - Low follower-to-following ratio
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Next.js)               │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Username   │  │   Features   │  │  Results   │ │
│  │    Input    │  │    Input     │  │  Display   │ │
│  └─────────────┘  └──────────────┘  └────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/REST API
                       ▼
┌─────────────────────────────────────────────────────┐
│                 Backend (FastAPI)                   │
│  ┌─────────────────────────────────────────────┐   │
│  │         API Endpoints                       │   │
│  │  /predict/username  │  /predict/features    │   │
│  └─────────────────────────────────────────────┘   │
│  ┌──────────────┐  ┌──────────────────────────┐   │
│  │  Instagram   │  │  Feature Engineering     │   │
│  │   Scraper    │  │  (Ratio Calculations)    │   │
│  │ (Instaloader)│  └──────────────────────────┘   │
│  └──────────────┘                 │                │
│                                    ▼                │
│  ┌─────────────────────────────────────────────┐   │
│  │     ML Model (Scikit-learn)                 │   │
│  │     - Random Forest/XGBoost Classifier      │   │
│  │     - Pre-trained on fake/real dataset      │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Python** | 3.8+ | Core programming language |
| **FastAPI** | Latest | High-performance web framework |
| **Uvicorn** | Latest | ASGI server |
| **Scikit-learn** | Latest | Machine learning models |
| **Pandas** | Latest | Data manipulation |
| **Instaloader** | Latest | Instagram profile scraping |
| **Pydantic** | Latest | Data validation |
| **Joblib** | Latest | Model serialization |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 15.3.3 | React framework with SSR |
| **React** | 19.0 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.1.8 | Utility-first CSS framework |
| **Framer Motion** | 12.16.0 | Animation library |
| **Axios** | 1.9.0 | HTTP client |
| **React Icons** | 5.5.0 | Icon library |

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 18+** and npm ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Instagram-Fake-Account-Detector.git
   cd Instagram-Fake-Account-Detector
   ```

2. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

3. **Create a virtual environment** (Recommended)
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Verify model file exists**
   ```bash
   # Ensure instagram_fake_detector.joblib is in the Backend directory
   # If not, you'll need to train the model (see Machine Learning Model section)
   ```

### Frontend Setup

1. **Navigate to Frontend directory**
   ```bash
   cd ../Frontend/instagram-fake-detector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify environment**
   ```bash
   npm list next react
   ```

---

## 🚀 Usage

### Running the Backend

1. **Start the FastAPI server**
   ```bash
   cd Backend
   # Activate virtual environment if not already active
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

2. **Verify the server is running**
   - Open browser: `http://127.0.0.1:8000`
   - API Documentation: `http://127.0.0.1:8000/docs`
   - Expected output: `{"message": "Instagram Fake Account Detector API"}`

### Running the Frontend

1. **Start the Next.js development server**
   ```bash
   cd Frontend/instagram-fake-detector
   npm run dev
   ```

2. **Access the application**
   - Open browser: `http://localhost:3000`
   - The UI should load with the Instagram detector interface

### Making Predictions

#### Method 1: Via Web Interface

1. Navigate to `http://localhost:3000`
2. **Username Detection**:
   - Click "Check by Username" tab
   - Enter Instagram username (without @)
   - Click "Analyze Account"
   - View results with account metrics

3. **Feature Detection**:
   - Click "Check by Features" tab
   - Enter account statistics:
     - Follower Count
     - Following Count
     - Post Count
     - Digits in Username
     - Username Length
   - Click "Analyze Features"
   - View prediction results

#### Method 2: Via API (cURL)

**Username Prediction:**
```bash
curl -X POST "http://127.0.0.1:8000/predict/username" \
  -H "Content-Type: application/json" \
  -d '{"username": "example_user"}'
```

**Feature Prediction:**
```bash
curl -X POST "http://127.0.0.1:8000/predict/features" \
  -H "Content-Type: application/json" \
  -d '{
    "userFollowerCount": 150,
    "userFollowingCount": 300,
    "userMediaCount": 25,
    "usernameDigitCount": 0,
    "usernameLength": 12
  }'
```

#### Method 3: Via Python

```python
import requests

# Username prediction
response = requests.post(
    "http://127.0.0.1:8000/predict/username",
    json={"username": "example_user"}
)
print(response.json())

# Feature prediction
response = requests.post(
    "http://127.0.0.1:8000/predict/features",
    json={
        "userFollowerCount": 150,
        "userFollowingCount": 300,
        "userMediaCount": 25,
        "usernameDigitCount": 0,
        "usernameLength": 12
    }
)
print(response.json())
```

---

## 📚 API Documentation

### Base URL
```
http://127.0.0.1:8000
```

### Endpoints

#### 1. Root Endpoint
```http
GET /
```

**Response:**
```json
{
  "message": "Instagram Fake Account Detector API"
}
```

---

#### 2. Predict by Username
```http
POST /predict/username
```

**Request Body:**
```json
{
  "username": "string"
}
```

**Response (Success):**
```json
{
  "username": "example_user",
  "prediction": "real" | "fake"
}
```

**Response (Error):**
```json
{
  "detail": "Username not found or private."
}
```

**Status Codes:**
- `200`: Success
- `404`: Username not found or account is private
- `422`: Validation error

---

#### 3. Predict by Features
```http
POST /predict/features
```

**Request Body:**
```json
{
  "userFollowerCount": integer,
  "userFollowingCount": integer,
  "userMediaCount": integer,
  "usernameDigitCount": integer,
  "usernameLength": integer
}
```

**Response:**
```json
{
  "prediction": "real" | "fake"
}
```

**Status Codes:**
- `200`: Success
- `422`: Validation error (invalid input types or missing fields)

---

### Interactive API Documentation

FastAPI provides automatic interactive documentation:

- **Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

---

## 🤖 Machine Learning Model

### Model Details

- **Algorithm**: Trained classifier (Random Forest / XGBoost / Logistic Regression)
- **Format**: Serialized using Joblib (`.joblib` file)
- **Training Data**: Real and fake Instagram account datasets

### Features Used

The model uses **8 engineered features**:

#### Raw Features (5)
1. **userFollowerCount**: Number of followers
2. **userFollowingCount**: Number of accounts following
3. **userMediaCount**: Number of posts
4. **usernameDigitCount**: Count of digits in username
5. **usernameLength**: Total characters in username

#### Engineered Features (3)
1. **followers_following_ratio**: 
   ```python
   userFollowerCount / (userFollowingCount + 1)
   ```
   - Real accounts: Higher ratio (more followers than following)
   - Fake accounts: Lower ratio (following many, few followers)

2. **followers_media_ratio**: 
   ```python
   userFollowerCount / (userMediaCount + 1)
   ```
   - Indicates engagement quality
   - Fake accounts often have disproportionate ratios

3. **username_digit_ratio**: 
   ```python
   usernameDigitCount / (usernameLength + 1)
   ```
   - Fake accounts often have random digits (e.g., user12345678)
   - Real accounts typically have meaningful usernames

### Model Training (Optional)

If you need to retrain the model:

```python
# Located in: notebook/notebook.py
# 1. Prepare your dataset (realAccountData.json, fakeAccountData.json)
# 2. Run feature engineering
# 3. Train the model
# 4. Save to instagram_fake_detector.joblib

import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Load and prepare data
# ... (your data loading code)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'instagram_fake_detector.joblib')
```

---

## 📁 Project Structure

```
Instagram-Fake-Account-Detector/
│
├── Backend/
│   ├── main.py                              # FastAPI application entry point
│   ├── requirements.txt                      # Python dependencies
│   ├── instagram_fake_detector.joblib        # Trained ML model
│   │
│   └── app/
│       ├── config.py                         # Configuration settings
│       │
│       ├── models/
│       │   └── model_loader.py              # ML model loading logic
│       │
│       ├── schemas/
│       │   └── request.py                   # Pydantic request models
│       │
│       ├── services/
│       │   ├── instagram_scraper.py         # Instagram profile scraper
│       │   └── prediction.py                # Prediction logic
│       │
│       └── utils/
│           └── feature_engineering.py       # Feature calculation functions
│
├── Frontend/
│   └── instagram-fake-detector/
│       ├── package.json                      # Node dependencies
│       ├── next.config.ts                    # Next.js configuration
│       ├── tsconfig.json                     # TypeScript configuration
│       ├── tailwind.config.ts                # Tailwind CSS configuration
│       ├── postcss.config.mjs                # PostCSS configuration
│       │
│       ├── app/
│       │   ├── layout.tsx                   # Root layout component
│       │   ├── page.tsx                     # Main page component
│       │   └── globals.css                  # Global styles
│       │
│       └── public/                          # Static assets
│
├── notebook/
│   ├── notebook.py                          # Model training script
│   └── input/
│       ├── fakeAccountData.json            # Fake account dataset
│       └── realAccountData.json            # Real account dataset
│
└── README.md                                # This file
```

---

## 🔍 Features Explained

### Why These Features Matter

#### 1. **Followers-to-Following Ratio**
   - **Real Accounts**: Typically have balanced or higher follower counts
   - **Fake Accounts**: Often follow many accounts but have few followers
   - **Threshold**: Ratio < 0.5 is suspicious

#### 2. **Followers-to-Media Ratio**
   - **Real Accounts**: Consistent engagement (followers proportional to content)
   - **Fake Accounts**: Few posts but may have bought followers
   - **Red Flag**: High followers with very few posts

#### 3. **Username Digit Ratio**
   - **Real Accounts**: Meaningful usernames (e.g., @john_smith, @tech_guru)
   - **Fake Accounts**: Random numbers (e.g., @user82746294, @spam123456)
   - **Pattern**: High digit ratio indicates bot-generated accounts

#### 4. **Profile Completeness**
   - Number of posts indicates account activity
   - Genuine accounts typically have consistent posting history
   - Fake accounts may have irregular or sparse content

---

## 🎯 Model Accuracy & Performance

### Expected Performance Metrics

- **Accuracy**: ~85-95% (depending on training data)
- **Precision**: High for fake account detection
- **Recall**: Balanced to minimize false positives
- **Inference Time**: < 100ms per prediction

### Limitations

- **Private Accounts**: Cannot scrape data for username-based detection
- **New Accounts**: Limited data may affect accuracy
- **Evolving Patterns**: Fake accounts adapt; model needs periodic retraining
- **API Rate Limits**: Instagram scraping subject to rate limiting

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**: Open an issue with detailed information
2. **Suggest Features**: Propose new features or improvements
3. **Submit PRs**: Fix bugs or implement new features
4. **Improve Documentation**: Enhance README or add code comments
5. **Share Datasets**: Contribute training data for better accuracy

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m "Add feature-name"`
6. Push: `git push origin feature-name`
7. Create a Pull Request

### Code Style

- **Python**: Follow PEP 8 guidelines
- **TypeScript**: Use ESLint configuration provided
- **Comments**: Document complex logic
- **Types**: Use type hints (Python) and TypeScript types

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## 🙏 Acknowledgements

### Libraries & Frameworks

- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Next.js](https://nextjs.org/)** - React framework for production
- **[Scikit-learn](https://scikit-learn.org/)** - Machine learning library
- **[Instaloader](https://instaloader.github.io/)** - Instagram scraping tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### Inspiration

- Research papers on social media bot detection
- Instagram's community guidelines
- Open-source ML projects

---

## 📞 Contact & Support

### Issues & Questions

- **GitHub Issues**: [Report bugs or request features](https://github.com/sadinsa07/Instagram-Fake-Account-Detector/issues)
- **Discussions**: [Ask questions or share ideas](https://github.com/sadinsa07/Instagram-Fake-Account-Detector/discussions)

### Disclaimer

⚠️ **Important Notes:**

- This tool is for **educational and research purposes only**
- Not affiliated with Instagram, Meta, or Facebook
- Use responsibly and respect Instagram's Terms of Service
- Predictions are probabilistic and not 100% accurate
- Always verify suspicious accounts through official channels
- Respect user privacy and data protection laws

---

## 🚀 Roadmap

### Future Enhancements

- [ ] **Advanced ML Models**: Implement deep learning (LSTM, Transformers)
- [ ] **Batch Processing**: Analyze multiple accounts simultaneously
- [ ] **Historical Analysis**: Track account behavior over time
- [ ] **Browser Extension**: Chrome/Firefox extension for real-time detection
- [ ] **API Rate Limiting**: Implement request throttling
- [ ] **User Authentication**: Secure access with user accounts
- [ ] **Analytics Dashboard**: Visualize detection statistics
- [ ] **Multi-platform Support**: Extend to Twitter, TikTok, etc.
- [ ] **Mobile App**: iOS and Android native applications
- [ ] **Model Explainability**: SHAP values for transparency

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

## 📈 Version History

### v1.0.0 (Current)
- ✅ Initial release
- ✅ Dual detection modes (username & features)
- ✅ Modern React/Next.js frontend
- ✅ FastAPI backend with CORS support
- ✅ Pre-trained ML model
- ✅ Comprehensive documentation

---

<div align="center">

**Built with ❤️ by Sadinsa Warangani**

[⬆ Back to Top](#-instagram-fake-account-detector)

</div>
