import {API_BASE_URL, API_LOGIN_RESOURCE} from '@env';
import AuthenticationResponse from "../models/AuthenticationResponse";

export default class ApiService {
    async authenticate(username: string, password: string): Promise<AuthenticationResponse> {
        const data = new URLSearchParams();
        data.set("username", username);
        data.set("password", password);

        const response = await fetch(API_BASE_URL + API_LOGIN_RESOURCE, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        return response.json();
    }
}