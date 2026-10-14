import { ToastOptions, useIonToast } from "@ionic/react";

type ToastType = "default" | "error" | "success";

const GET_DEFAULT_OPTIONS = (type: ToastType = "default"): ToastOptions => {
    return {
        color:
            type == "default" ? "primary" : type == "error" ? "danger" : type,
        duration: 5000,
        position: "top",
    };
};

export const useToast = () => {
    const [present, dismiss] = useIonToast();

    const __handlePresent__ = (
        message: string,
        options?: Omit<ToastOptions, "position" | "color" | "message"> & {
            type?: ToastType;
        },
    ) => {
        const default_config = GET_DEFAULT_OPTIONS(options?.type);
        return present({
            message,
            ...default_config,
            ...options,
        });
    };

    return {
        present: __handlePresent__,
        dismiss,
    };
};
