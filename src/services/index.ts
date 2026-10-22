import axios from "axios";
import { SERVICE_HEADER_KEYS } from "../constants/services/headers";
import { Preferences } from "@capacitor/preferences";
import { SERVICE_PREFERENCE_KEYS } from "../constants/services/preferences";
import { v4 as uuidv4 } from "uuid";
import { apiErrorHandler } from "../utils/apiErrorHandler";
import { SignedTokens } from "../types/services/authTypes";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 1000 * 60 * 3,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor: Attach authentication token to outgoing requests
axiosInstance.interceptors.request.use(
    async (config) => {
        const is_protected = Boolean(
            config.headers.get(SERVICE_HEADER_KEYS.isProtected),
        );
        if (is_protected) {
            const { getAccessToken } = useLocalStorage();
            const token = await getAccessToken();
            if (token) config.headers.set("Authorization", `Bearer ${token}`);

            config.headers.delete(SERVICE_HEADER_KEYS.isProtected);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response Interceptor: Handle global response errors (e.g. 401 Unauthenticated)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user");
        }

        return Promise.reject(apiErrorHandler(error));
    },
);

export default axiosInstance;

/**
 *
 * Handles persistence of signed tokens and device_id
 */
export function useLocalStorage() {
    const generateDeviceId = async (): Promise<string> => {
        const newId = uuidv4();
        await Preferences.set({
            key: SERVICE_PREFERENCE_KEYS.deviceId,
            value: newId,
        });
        return newId;
    };

    const getDeviceId = async () =>
        (
            await Preferences.get({
                key: SERVICE_PREFERENCE_KEYS.deviceId,
            })
        ).value;

    const getAccessToken = async () =>
        (
            await Preferences.get({
                key: SERVICE_PREFERENCE_KEYS.accessToken,
            })
        ).value;

    const getRefreshToken = async () => {
        return (
            await Preferences.get({
                key: SERVICE_PREFERENCE_KEYS.refreshToken,
            })
        ).value;
    };

    const setTokens = async (tokens: SignedTokens) => {
        await Preferences.set({
            key: SERVICE_PREFERENCE_KEYS.accessToken,
            value: tokens.access_token,
        });
        await Preferences.set({
            key: SERVICE_PREFERENCE_KEYS.refreshToken,
            value: tokens.refresh_token,
        });
    };

    const getTokens = async () => {
        const accessToken = (
            await Preferences.get({
                key: SERVICE_PREFERENCE_KEYS.accessToken,
            })
        ).value;
        const refreshToken = (
            await Preferences.get({
                key: SERVICE_PREFERENCE_KEYS.refreshToken,
            })
        ).value;

        return {
            accessToken: accessToken || null,
            refreshToken: refreshToken || null,
        };
    };

    const clearStorage = async () => {
        console.log("Triggered");

        await Preferences.clear();
    };

    return {
        getAccessToken,
        getDeviceId,
        getRefreshToken,
        generateDeviceId,
        setTokens,
        getTokens,
        clearStorage,
    };
}
