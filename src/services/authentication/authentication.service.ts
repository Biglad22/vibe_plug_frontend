import { axiosInstance, useLocalStorage } from "../index";
import {
    AuthResponse,
    LoginCredentials,
    SignUpData,
    UsernameAvailabilityResponse,
    NewPasswordResetRequest,
} from "../../types/services/authTypes";
import {
    isProtectedHeader,
    SERVICE_HEADER_KEYS,
} from "../../constants/services/headers";
import { MessageResponse } from "../../types/services/generics";

export const authService = {
    /**
     * Authenticate user with credentials
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { generateDeviceId } = useLocalStorage();
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
    async signUp(data: SignUpData): Promise<Omit<AuthResponse, "user">> {
        const { generateDeviceId } = useLocalStorage();
        const device_id = await generateDeviceId();

        const response = await axiosInstance.post<Omit<AuthResponse, "user">>(
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
        const { getDeviceId, getRefreshToken } = useLocalStorage();
        const device_id = await getDeviceId();
        const refresh_token = await getRefreshToken();

        await axiosInstance.post(
            "/auth/logout",
            {
                refresh_token,
            },
            {
                headers: {
                    ...isProtectedHeader,
                    [SERVICE_HEADER_KEYS.deviceId]: device_id,
                },
            },
        );
    },

    /**
     * Refresh access token
     */
    async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
        const { getDeviceId } = useLocalStorage();
        const device_id = await getDeviceId();
        const response = await axiosInstance.post<{ accessToken: string }>(
            "/auth/refresh",
            { refreshToken },
            {
                headers: {
                    [SERVICE_HEADER_KEYS.deviceId]: device_id,
                },
            },
        );
        return response.data;
    },

    /**
     * Request email verification
     */
    async requestEmailVerification(email: string): Promise<MessageResponse> {
        const response = await axiosInstance.post<MessageResponse>(
            "auth/request-email-verification",
            { email },
        );
        return response.data;
    },

    /**
     * Verify email
     */
    async verifyEmail(email: string, otp: string): Promise<MessageResponse> {
        const response = await axiosInstance.post<MessageResponse>(
            "auth/verify-email",
            { email, otp },
        );
        return response.data;
    },

    /**
     * Request password reset
     */
    async requestPasswordReset(email: string): Promise<MessageResponse> {
        const res = await axiosInstance.post("/auth/request-password-reset", {
            email,
        });
        return res.data;
    },

    /**
     * Reset password
     */
    async resetPassword(
        formData: NewPasswordResetRequest,
    ): Promise<MessageResponse> {
        const res = await axiosInstance.post("/auth/reset-password", formData);
        return res.data;
    },
};

export default authService;
