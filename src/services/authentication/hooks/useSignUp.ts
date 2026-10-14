import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormData } from "../../../schemas/authentication";
import { useApiServiceSecurity } from "../..";
import { authService } from "../services";
import { useProcessState } from "../../../hooks/useProcessState";
import { useToast } from "../../../hooks/useToast";
import { useCallback } from "react";
import { useIonRouter } from "@ionic/react";

export function useUsernameAvailability() {
    const { isLoading, setIsLoading, error, setError, clearError } =
        useProcessState();
    const { present } = useToast();

    async function __checkAvailabilityMech__(username: string) {
        try {
            setIsLoading(true);

            if (!username.trim()) {
                return clearError();
            }

            const res = await authService.checkUsernameAvailability(username);
            if (!res?.data.available) {
                setError(res?.data.message || "username is taken");
                return false;
            }

            clearError();
            return res?.data.available || true;
        } catch (error: any) {
            present(
                error.message ||
                    error.details ||
                    "Something went wrong, try again.",
                { type: "error" },
            );
        } finally {
            setIsLoading(false);
        }
    }

    const checkAvailability = useCallback(__checkAvailabilityMech__, []);

    return {
        isLoading,
        checkAvailability,
        error,
    };
}


export interface UseSignUpReturn {
    form: UseFormReturn<SignUpFormData>;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    isBusy: boolean;
}

export const useSignUp = (): UseSignUpReturn => {
    const { isLoading, setIsLoading } = useProcessState();
    const { setTokens } = useApiServiceSecurity();
    const { present } = useToast();
    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const router = useIonRouter();

    const handleFormSubmit = async (data: SignUpFormData) => {
        try {
            setIsLoading(true);
            const { confirm_password, ...signUpPayload } = data;
            const res = await authService.signUp(signUpPayload);
            await setTokens(res.tokens);
            router.push("/dashboard/home", "root", "replace");
        } catch (error: any) {
            present(error.message || error.details || "Something went wrong.", {
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = form.handleSubmit(handleFormSubmit);

    return {
        form,
        onSubmit,
        isBusy: isLoading,
    };
};

export default useSignUp;
