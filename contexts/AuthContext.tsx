import React, {createContext, useEffect, useState} from 'react';
import ApiService from "../services/ApiService";
import AuthenticationResponse from "../models/AuthenticationResponse";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from "react-native";
import { View } from '../components/Themed';

export interface UserData {
    username: string | undefined;
    accessToken: string | undefined;
    refreshToken: string | undefined;
}

export interface AuthState {
    user: UserData;
    authenticate(username: string, password: string): Promise<AuthenticationResponse>;
}

export const AuthContext = createContext<AuthState>({} as AuthState);


export const AuthProvider = ({children}) => {
    const apiService = new ApiService();
    const [user, setUser] = useState({} as UserData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storageUsername = await AsyncStorage.getItem('@User:username');
            const storageAccessToken = await AsyncStorage.getItem('@User:accessToken');
            const storageRefreshToken = await AsyncStorage.getItem('@User:refreshToken');

            if (storageUsername && storageAccessToken && storageRefreshToken) {
                setUser({
                    "username": storageUsername,
                    "accessToken": storageAccessToken,
                    "refreshToken": storageRefreshToken
                })
            }
            setLoading(false);
        }
        if (Object.keys(user).length === 0) {
            loadStorageData()
                .then(() => console.debug("Loaded user storage data."))
                .catch((err) => console.error("Failed to load user storage data."));
        }
    });

    async function storeUsername(username: string) {
        await AsyncStorage.setItem(
            '@User:username',
            username
        );
    }

    async function storeAccessToken(accessToken: string) {
        await AsyncStorage.setItem(
            '@User:accessToken',
            accessToken
        );
    }

    async function storeRefreshToken(refreshToken: string) {
        await AsyncStorage.setItem(
            '@User:refreshToken',
            refreshToken
        );
    }



    async function _storeAuthData(username: string, accessToken: string, refreshToken: string) {
        let pipeline = [
            {
                "step": "Store username",
                "run": storeUsername,
                "args": username,
                "success": false,
                "completed": false,
            },
            {
                "step": "Store access token",
                "run": storeAccessToken,
                "args": accessToken,
                "success": false,
                "completed": false,
            },
            {
                "step": "Store refresh token",
                "run": storeRefreshToken,
                "args": refreshToken,
                "success": false,
                "completed": false,
            }];

        for (let pipe of pipeline) {
            try {
                await pipe.run(pipe.args);
                pipe.success = true;
            } catch (error) {
                pipe.success = false;
                console.error("Error saving the data using AsyncStorage: " + error);
                // Error saving data
            } finally {
                pipe.completed = true;
                console.debug(JSON.stringify(pipe));
            }
        }
        return pipeline;
    }

    async function authenticate(username_: string, password_: string) {
        return apiService.authenticate(username_, password_)
            .then((response) => {
                let accessToken = response.accessToken;
                let refreshToken = response.refreshToken;

                setUser({
                    "username": username_,
                    "accessToken": accessToken,
                    "refreshToken": refreshToken
                })

                _storeAuthData(username_, accessToken, refreshToken);
                return response;
            })
    }

    async function logout() {
        await AsyncStorage.clear();
        setUser({} as UserData);
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        );
    } else {
        return(
            <AuthContext.Provider value={{user, authenticate}}>
                {children}
            </AuthContext.Provider>
        );
    }
};