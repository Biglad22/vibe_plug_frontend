import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useUserProfile from "../services/user/hooks/useUserProfile";
import { Navigate } from "react-router-dom";

type Props = {
    children: ReactNode;
};

export default function RouteGuard({ children }: Props) {
    const { status, isAuthenticated } = useSelector(
        (state: RootState) => state.userSession,
    );

    // fetch user profile for guarded routes
    useUserProfile();

    return status !== "loading" && isAuthenticated ? (
        children
    ) : (
        <Navigate to={"/auth/sign-in"} />
    );
}
