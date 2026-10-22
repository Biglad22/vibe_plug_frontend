import { useQuery } from "@tanstack/react-query";
import userService from "../user.service";
import { useToast } from "../../../hooks/useToast";
import { useIonRouter } from "@ionic/react";
import { usePageLoader } from "../../../context";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearUserSession } from "../../../store/userSessionSlice";
import { useDispatch } from "react-redux";

export default function useUserProfile(enabled: boolean = true) {
    const { isAuthenticated } = useSelector(
        (state: RootState) => state.userSession,
    );
    const { present: presentToast } = useToast();
    const { hide, show } = usePageLoader();
    const router = useIonRouter();
    const dispatch = useDispatch<any>();

    async function query() {
        try {
            show();
            return await userService.getProfile();
        } catch (error: any) {
            presentToast(
                error.message ||
                    error.details ||
                    "User not authorized to access this resource",
                { type: "error" },
            );
            if (error.status == 401) {
                router.push("/auth/sign-in", "root", "replace");
            }

            console.log(error);
            
            await dispatch(clearUserSession());
            throw error;
        } finally {
            hide();
        }
    }

    return useQuery({
        queryKey: ["user-profile"],
        queryFn: query,
        enabled: enabled && isAuthenticated,
    });
}
