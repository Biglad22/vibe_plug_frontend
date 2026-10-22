import { useCallback, useState } from "react";
import useCountDown from "../../../hooks/useCountDown";
import { useProcessState } from "../../../hooks/useProcessState";
import { useToast } from "../../../hooks/useToast";
import authService from "../authentication.service";
import { useForm } from "react-hook-form";
import z from "zod";
import { OTPSchema } from "../../../schemas/generics";
import { zodResolver } from "@hookform/resolvers/zod";

export const EmailVerificationOtpFormSchema = z.object({
    otp: OTPSchema,
    email: z.email("Please enter a valid email address"),
});

export default function useEmailVerification() {
    const { currentTime, isTiming, startTimer, stopTimer } = useCountDown(2);
    const [canVerify, setCanVerify] = useState<boolean>(false);
    const { present } = useToast();

    const emailValidator = () => formMethod.trigger("email");

    const formMethod = useForm({
        resolver: zodResolver(EmailVerificationOtpFormSchema),
    });

    const { isLoading, setIsLoading } = useProcessState();

    const requestEmailVerificationOtp = useCallback(async () => {
        try {
            setIsLoading(true);
            const isValid = await emailValidator();
            if (!isValid) return;

            const { email } = formMethod.getValues();

            if (isTiming) return;
            const { message } =
                await authService.requestEmailVerification(email);
            startTimer();
            present(message);
            setCanVerify(true);
        } catch (error: any) {
            present(error.message || error.details || "Something went wrong.", {
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, setIsLoading, isTiming, startTimer]);

    const verifyEmail = useCallback(
        formMethod.handleSubmit(async (formData) => {
            try {
                setIsLoading(true);
                const { message } = await authService.verifyEmail(
                    formData.email,
                    formData.otp,
                );
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
        requestEmailVerificationOtp,
        verifyEmail,
        otpFormMethod: formMethod,
        canVerify,
    };
}
