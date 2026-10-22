import { BasicUser } from "./userType";

export interface SignedTokens {
    access_token: string;
    refresh_token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    tokens: SignedTokens;
    user: BasicUser;
}

export interface SignUpData {
    email: string;
    password: string;
    full_name: string;
    user_name: string;

    school?: string;
    department?: string;
    bio?: string;
}

export interface UsernameAvailabilityResponse {
    available: boolean;
    message: string;
}

export type NewPasswordResetRequest = {
    email: string;
    password: string;
    token: string;
};
