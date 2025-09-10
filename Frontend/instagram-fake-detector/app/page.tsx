"use client"

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { FiInstagram, FiUser, FiBarChart2, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

// Define the shape of the API response
interface PredictionResponse {
  prediction: 'real' | 'fake';
  features?: {
    userFollowerCount: number;
    userFollowingCount: number;
    userMediaCount: number;
    usernameDigitCount: number;
    usernameLength: number;
    followers_following_ratio: number;
    username_digit_ratio: number;
  };
}

// Define tab types
type TabType = 'username' | 'features';

// Define feature input state
interface Features {
  userFollowerCount: string;
  userFollowingCount: string;
  userMediaCount: string;
  usernameDigitCount: string;
  usernameLength: string;
}

export default function InstagramDetector() {
  const [activeTab, setActiveTab] = useState<TabType>('username');
  const [username, setUsername] = useState('');
  const [features, setFeatures] = useState<Features>({
    userFollowerCount: '',
    userFollowingCount: '',
    userMediaCount: '',
    usernameDigitCount: '',
    usernameLength: '',
  });
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle username submission
  const handleUsernameSubmit = async () => {
    if (!username.trim()) {
      setError('Please enter a valid Instagram username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post<PredictionResponse>(
        'http://127.0.0.1:8000/predict/username',
        { username: username.trim() }
      );
      setResult(response.data);
    } catch (err) {
      const errorMessage = err instanceof AxiosError && err.response?.data?.detail
        ? err.response.data.detail
        : 'Failed to analyze account. Please try again.';
      setError(errorMessage);
      console.error('Username submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle features submission
  const handleFeaturesSubmit = async () => {
    const numericFeatures = {
      userFollowerCount: parseInt(features.userFollowerCount) || 0,
      userFollowingCount: parseInt(features.userFollowingCount) || 0,
      userMediaCount: parseInt(features.userMediaCount) || 0,
      usernameDigitCount: parseInt(features.usernameDigitCount) || 0,
      usernameLength: parseInt(features.usernameLength) || 0,
    };

    // Validate inputs
    if (Object.values(numericFeatures).some(value => value < 0)) {
      setError('Feature values cannot be negative');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post<PredictionResponse>(
        'http://127.0.0.1:8000/predict/features',
        numericFeatures
      );
      setResult(response.data);
    } catch (err) {
      const errorMessage = err instanceof AxiosError && err.response?.data?.detail
        ? err.response.data.detail
        : 'Failed to analyze features. Please try again.';
      setError(errorMessage);
      console.error('Features submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle feature input changes
  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow only non-negative numbers
    if (value === '' || /^\d*$/.test(value)) {
      setFeatures(prev => ({ ...prev, [name]: value }));
    }
  };

  // Reset form and results
  const handleReset = () => {
    setUsername('');
    setFeatures({
      userFollowerCount: '',
      userFollowingCount: '',
      userMediaCount: '',
      usernameDigitCount: '',
      usernameLength: '',
    });
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mb-4">
            <FiInstagram className="text-white text-2xl" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Instagram Account Authenticity Check
          </h1>
          <p className="text-lg text-gray-600">
            Detect potentially fake Instagram accounts using machine learning
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('username')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeTab === 'username' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              aria-selected={activeTab === 'username'}
              role="tab"
            >
              <div className="flex items-center justify-center gap-2">
                <FiUser aria-hidden="true" /> Check by Username
              </div>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('features')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeTab === 'features' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              aria-selected={activeTab === 'features'}
              role="tab"
            >
              <div className="flex items-center justify-center gap-2">
                <FiBarChart2 aria-hidden="true" /> Check by Features
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'username' ? (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Instagram Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">@</span>
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                      className="text-black pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="e.g., sadinsawarangani"
                      aria-describedby={error ? 'username-error' : undefined}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleUsernameSubmit}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      <>Analyze Account</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={loading}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'userFollowerCount',
                      label: 'Follower Count',
                      placeholder: 'e.g., 150',
                    },
                    {
                      id: 'userFollowingCount',
                      label: 'Following Count',
                      placeholder: 'e.g., 300',
                    },
                    {
                      id: 'userMediaCount',
                      label: 'Post Count',
                      placeholder: 'e.g., 25',
                    },
                    {
                      id: 'usernameDigitCount',
                      label: 'Digits in Username',
                      placeholder: 'e.g., 0',
                    },
                    {
                      id: 'usernameLength',
                      label: 'Username Length',
                      placeholder: 'e.g., 12',
                      className: 'sm:col-span-2',
                    },
                  ].map(field => (
                    <div key={field.id} className={field.className}>
                      <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {field.label}
                      </label>
                      <input
                        type="number"
                        id={field.id}
                        name={field.id}
                        value={features[field.id as keyof Features]}
                        onChange={handleFeatureChange}
                        disabled={loading}
                        min="0"
                        className="text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder={field.placeholder}
                        aria-describedby={error ? `${field.id}-error` : undefined}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleFeaturesSubmit}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      <>Analyze Features</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={loading}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start gap-2"
                role="alert"
              >
                <FiAlertTriangle className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span id="error-message">{error}</span>
              </motion.div>
            )}

            {/* Results */}
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-8 space-y-6"
              >
                <h3 className="text-lg font-medium text-gray-900">Analysis Results</h3>

                {activeTab === 'username' && result.features && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Followers', value: result.features.userFollowerCount },
                      { label: 'Following', value: result.features.userFollowingCount },
                      { label: 'Posts', value: result.features.userMediaCount },
                      {
                        label: 'Username Score',
                        value: `${((1 - (result.features.username_digit_ratio || 0)) * 10).toFixed(1)}/10`,
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="text-xl font-semibold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`p-4 rounded-lg flex items-center gap-3 ${
                    result.prediction === 'real' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}
                  role="alert"
                >
                  {result.prediction === 'real' ? (
                    <FiCheckCircle className="text-2xl flex-shrink-0" aria-hidden="true" />
                  ) : (
                    <FiAlertTriangle className="text-2xl flex-shrink-0" aria-hidden="true" />
                  )}
                  <div>
                    <p className="font-medium">
                      This account is likely {result.prediction === 'real' ? 'REAL' : 'FAKE'}
                    </p>
                    <p className="text-sm mt-1">
                      {result.prediction === 'real'
                        ? 'This account shows characteristics of a genuine Instagram profile.'
                        : 'This account exhibits several signs that may indicate it is fake or spam.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p>This tool analyzes Instagram accounts using machine learning models.</p>
          <p className="mt-1">Not affiliated with Instagram or Meta.</p>
        </motion.div>
      </div>
    </div>
  );
}