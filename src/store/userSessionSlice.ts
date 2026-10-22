import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useLocalStorage } from "../services";
import { SignedTokens } from "../types/services/authTypes";

export type UserSessionStatus = "idle" | "loading" | "succeeded" | "failed";

export interface UserSessionState {
    isAuthenticated: boolean;
    tokens: SignedTokens | null;
    status: UserSessionStatus;
}

const { getTokens, clearStorage, setTokens } = useLocalStorage();
const initialState: UserSessionState = {
    isAuthenticated: false,
    tokens: null,
    status: "idle",
};

export const initializeUserSession = createAsyncThunk(
    "userSession/initialize",
    async () => {
        const tokens = await getTokens();

        if (!tokens.accessToken || !tokens.refreshToken) {
            return { tokens: null };
        }

        return {
            tokens: {
                access_token: tokens.accessToken,
                refresh_token: tokens.refreshToken,
            },
        };
    },
);

const userSessionSlice = createSlice({
    name: "userSession",
    initialState,
    reducers: {
        setSession: (
            state,
            action: PayloadAction<{ tokens: SignedTokens }>,
        ) => {
            const { tokens } = action.payload;

            state.tokens = tokens;
            state.isAuthenticated = Boolean(
                tokens?.access_token && tokens?.refresh_token,
            );
            state.status = "succeeded";
        },
        clearSession: (state) => {
            state.tokens = null;
            state.isAuthenticated = false;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeUserSession.pending, (state) => {
                state.status = "loading";
            })
            .addCase(initializeUserSession.fulfilled, (state, action) => {
                const { tokens } = action.payload;

                state.tokens = tokens;
                state.isAuthenticated = Boolean(
                    tokens?.access_token && tokens?.refresh_token,
                );
                state.status = "succeeded";
            })
            .addCase(initializeUserSession.rejected, (state) => {
                state.tokens = null;
                state.isAuthenticated = false;
                state.status = "failed";
            });
    },
});

const { setSession, clearSession } = userSessionSlice.actions;

// Thunk action to set session and persist tokens
export const setUserSession = (tokens: SignedTokens) => {
    return async (dispatch: any) => {
        dispatch(setSession({ tokens }));
        await setTokens(tokens);
    };
};

// Thunk action to clear session and clear persisted storage
export const clearUserSession = () => {
    return async (dispatch: any) => {
        dispatch(clearSession());
        await clearStorage();
    };
};

export default userSessionSlice.reducer;
