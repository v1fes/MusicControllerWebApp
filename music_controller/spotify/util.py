from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get


BASE_URL = "https://api.spotify.com/v1/me/"


def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    print(user_tokens)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.token_type = token_type
        tokens.expires_in = expires_in

       
        if refresh_token:
            tokens.refresh_token = refresh_token

        tokens.save(update_fields=['access_token', 'token_type', 'expires_in', 'refresh_token'])
    else:
        tokens = SpotifyToken(
            user=session_id,
            access_token=access_token,
            token_type=token_type,
            expires_in=expires_in,
            refresh_token=refresh_token
        )
        tokens.save()


def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if not tokens:
        return False 
    
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)

        return True

    return False


def refresh_spotify_token(session_id):
    tokens = get_user_tokens(session_id)
    if not tokens:
        raise Exception("No tokens found for session")

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': tokens.refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    if 'access_token' not in response:
        raise Exception(f"Failed to refresh token: {response.get('error_description', 'Unknown error')}")

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    
    refresh_token = response.get('refresh_token', tokens.refresh_token)

    update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)

def execute_spotify_api_request(session_id, endpoint, post_ = False, put_=False):
    tokens = get_user_tokens(session_id)
    headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokens.access_token}

    if post_:
        post(BASE_URL + endpoint, headers=headers)
    if put_:
        put(BASE_URL + endpoint, headers=headers)

    response = get(BASE_URL + endpoint, {}, headers=headers)
    try:
        return response.json()
    except:
        return {'Error': 'Issue with request'}
    
def play_song(session_id):
    return execute_spotify_api_request(session_id, "player/play", put_=True)


def pause_song(session_id):
    return execute_spotify_api_request(session_id, "player/pause", put_=True)

def skip_song(session_id):
    return execute_spotify_api_request(session_id, "player/next", post_=True)
 