import { axiosInstance, useApiServiceSecurity } from "../../index";
import {
    AuthResponse,
    LoginCredentials,
    SignUpData,
    User,
    UsernameAvailabilityResponse,
} from "../../../types/services/authTypes";
import {
    isProtectedHeader,
    SERVICE_HEADER_KEYS,
} from "../../../constants/services/headers";

export const authService = {
    /**
     * Authenticate user with credentials
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { generateDeviceId } = useApiServiceSecurity();
        const device_id = await generateDeviceId();

        const response = await axiosInstance.post<AuthResponse>(
            "/auth/login",
            credentials,
            {
                headers: {
                    [SERVICE_HEADER_KEYS.deviceId]: device_id,
                },
            },
        );
        return response.data;
    },

    /**
     * Check whether a username is available for signup
     */
    async checkUsernameAvailability(username: string) {
        const trimmedUsername = username.trim();

        if (!trimmedUsername) return;

        return await axiosInstance.get<UsernameAvailabilityResponse>(
            `/auth/check-username/${encodeURIComponent(trimmedUsername)}`,
        );
    },

    /**
     * Register a new user account
     */
    async signUp(data: SignUpData): Promise<AuthResponse> {
        const { generateDeviceId } = useApiServiceSecurity();
        const device_id = await generateDeviceId();

        const response = await axiosInstance.post<AuthResponse>(
            "/auth/signup",
            data,
            {
                headers: {
                    [SERVICE_HEADER_KEYS.deviceId]: device_id,
                },
            },
        );
        return response.data;
    },

    /**
     * Log out current user
     */
    async logout(): Promise<void> {
        const { getDeviceId } = useApiServiceSecurity();
        const device_id = await getDeviceId();

        await axiosInstance.post("/auth/logout", undefined, {
            headers: {
                ...isProtectedHeader,
                [SERVICE_HEADER_KEYS.deviceId]: device_id,
            },
        });
    },

    /**
     * Fetch current user profile
     */
    async getCurrentUser(): Promise<User> {
        const response = await axiosInstance.get<User>("/auth/me");
        return response.data;
    },

    /**
     * Refresh access token
     */
    async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
        const response = await axiosInstance.post<{ accessToken: string }>(
            "/auth/refresh",
            { refreshToken },
        );
        return response.data;
    },
};

export default authService;
