export interface SignedTokens {
    access_token: string;
    refresh_token: string;
}

export interface User {
    id: string;
    email: string;
    fullName?: string;
    avatarUrl?: string;
    createdAt?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    tokens: SignedTokens;
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
