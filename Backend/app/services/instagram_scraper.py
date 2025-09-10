import instaloader

def extract_instagram_features(username: str):
    try:
        L = instaloader.Instaloader()
        profile = instaloader.Profile.from_username(L.context, username)

        followers = profile.followers
        following = profile.followees
        posts = profile.mediacount
        username_text = profile.username

        digit_count = sum(c.isdigit() for c in username_text)
        username_length = len(username_text)

        return {
            'userFollowerCount': followers,
            'userFollowingCount': following,
            'userMediaCount': posts,
            'usernameDigitCount': digit_count,
            'usernameLength': username_length
        }
    except Exception as e:
        print("Instaloader Error:", e)
        return None
