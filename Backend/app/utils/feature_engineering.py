def engineer_features(df):
    df['followers_following_ratio'] = df['userFollowerCount'] / (df['userFollowingCount'] + 1)
    df['followers_media_ratio'] = df['userFollowerCount'] / (df['userMediaCount'] + 1)
    df['username_digit_ratio'] = df['usernameDigitCount'] / (df['usernameLength'] + 1)
    return df
