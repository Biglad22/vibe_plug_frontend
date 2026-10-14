import axios from "axios";
import { SERVICE_HEADER_KEYS } from "../constants/services/headers";
import { Preferences } from "@capacitor/preferences";
import { SERVICE_PREFERENCE_KEYS } from "../constants/services/preferences";
import { v4 as uuidv4 } from "uuid";
import { SignedTokens } from "./authentication";
import { apiErrorHandler } from "../utils/apiErrorHandler";

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
    (config) => {
        const is_protected = Boolean(
            config.headers.get(SERVICE_HEADER_KEYS.isProtected),
        );
        if (is_protected) {
            const { getAccessToken } = useApiServiceSecurity();
            const token = getAccessToken();
            if (token) config.headers.Authorization = `Bearer ${token}`;

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
export function useApiServiceSecurity() {
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

    return {
        getAccessToken,
        getDeviceId,
        getRefreshToken,
        generateDeviceId,
        setTokens,
    };
}
