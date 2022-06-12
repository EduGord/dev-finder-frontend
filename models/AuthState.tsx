export default class AuthState {
    _accessToken: string | undefined;
    _refreshToken: string | undefined;
    _authenticated: boolean | undefined;

    constructor(accessToken?: string, refreshToken?: string, authenticated=false) {
        this._refreshToken = refreshToken;
        this._accessToken = accessToken;
        this._authenticated = authenticated;
    }

    getAccessToken() {
        return this._accessToken;
    }

    getRefreshToken() {
        return this._refreshToken;
    }

    setAuthToken(accessToken: string) {
        this._accessToken = accessToken;
    }

    setRefreshToken(refreshToken: string) {
        this._refreshToken = refreshToken;
    }

    setAuthenticated(authenticated: boolean) {
        this._authenticated = authenticated;
    }
}