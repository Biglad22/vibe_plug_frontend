import { useToast } from "../../../hooks/useToast";
import { useIonRouter } from "@ionic/react";
import authService from "../authentication.service";
import { clearUserSession } from "../../../store/userSessionSlice";
import { useDispatch } from "react-redux";
import { usePageLoader } from "../../../context";

export const useSignOut = () => {
    const { hide, show } = usePageLoader();
    const { present } = useToast();

    const router = useIonRouter();
    const dispatch = useDispatch<any>();

    const triggerSignOut = async (): Promise<void> => {
        console.log("login... out");

        try {
            show;
            void (await authService.logout());
            await dispatch(clearUserSession());
            router.push("/auth/sign-in", "root", "replace");
        } catch (error: any) {
            let message =
                error.message || error.details || "Something went wrong.";
            if (error.status && error.status == 401) {
                message = "Incorrect email or password.";
            }
            present(message, {
                type: "error",
            });
        } finally {
            hide();
        }
    };

    return {
        triggerSignOut,
    };
};

export default useSignOut;
