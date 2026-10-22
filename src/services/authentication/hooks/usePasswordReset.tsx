import { useCallback, useState } from "react";
import useCountDown from "../../../hooks/useCountDown";
import { useProcessState } from "../../../hooks/useProcessState";
import { useToast } from "../../../hooks/useToast";
import authService from "../authentication.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "../../../schemas/authentication/newPasswordSchema";

export default function usePasswordReset() {
    const { currentTime, isTiming, startTimer, stopTimer } = useCountDown(2);

    const { present } = useToast();

    const emailValidator = () => formMethod.trigger("email");

    const formMethod = useForm({
        resolver: zodResolver(newPasswordSchema),
    });

    const { isLoading, setIsLoading } = useProcessState();

    const requestPasswordResetOtp = useCallback(async () => {
        try {
            setIsLoading(true);
            const isValid = await emailValidator();
            if (!isValid) return;

            const { email } = formMethod.getValues();

            if (isTiming) return;
            const { message } = await authService.requestPasswordReset(email);
            startTimer();
            present(message);
        } catch (error: any) {
            present(error.message || error.details || "Something went wrong.", {
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, setIsLoading, isTiming, startTimer]);

    const resetPassword = useCallback(
        formMethod.handleSubmit(async (formData) => {
            try {
                setIsLoading(true);
                const { confirm_password: _, ...reqData } = formData;
                const { message } = await authService.resetPassword(reqData);
                present(message);
            } catch (error: any) {
                present(
                    error.message || error.details || "Something went wrong.",
                    {
                        type: "error",
                    },
                );
            } finally {
                stopTimer();
                setIsLoading(false);
            }
        }),
        [isLoading, setIsLoading, isTiming, startTimer],
    );

    return {
        isLoading,
        isTiming,
        currentTime,
        requestPasswordResetOtp,
        resetPassword,
        formMethod,
    };
}
