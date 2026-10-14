import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInFormData } from "../../../schemas/authentication";
import { useProcessState } from "../../../hooks/useProcessState";
import { authService } from "../services";
import { useToast } from "../../../hooks/useToast";
import { useApiServiceSecurity } from "../..";
import { useIonRouter } from "@ionic/react";

export interface UseSignInReturn {
    formMethods: Omit<UseFormReturn<SignInFormData>, "handleSubmit">;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    isLoading: boolean;
}

export const useSignIn = (): UseSignInReturn => {
    const { isLoading, setIsLoading } = useProcessState();
    const { present } = useToast();
    const { setTokens } = useApiServiceSecurity();
    const router = useIonRouter();
    const formMethods = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleFormSubmit = async (data: SignInFormData): Promise<void> => {
        try {
            setIsLoading(true);
            const res = await authService.login(data);
            await setTokens(res.tokens);

            router.push("/dashboard/home", "root", "replace");
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
            setIsLoading(false);
        }
    };

    const onSubmit = formMethods.handleSubmit(handleFormSubmit);

    return {
        formMethods,
        onSubmit,
        isLoading,
    };
};

export default useSignIn;
