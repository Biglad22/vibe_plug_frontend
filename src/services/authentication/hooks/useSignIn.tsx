import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInFormData } from "../../../schemas/authentication";
import { useProcessState } from "../../../hooks/useProcessState";
import { useToast } from "../../../hooks/useToast";
import { useIonRouter } from "@ionic/react";
import authService from "../authentication.service";
import { setUserSession } from "../../../store/userSessionSlice";
import { useDispatch } from "react-redux";

export interface UseSignInReturn {
    formMethods: Omit<UseFormReturn<SignInFormData>, "handleSubmit">;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    isLoading: boolean;
}

export const useSignIn = (): UseSignInReturn => {
    const { isLoading, setIsLoading } = useProcessState();
    const { present } = useToast();

    const router = useIonRouter();
    const formMethods = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const dispatch = useDispatch<any>();

    const handleFormSubmit = async (data: SignInFormData): Promise<void> => {
        try {
            setIsLoading(true);
            const res = await authService.login(data);
            // await setTokens();
            await dispatch(setUserSession(res.tokens));

            if (res.user.verification_tier == "unverified") {
                return router.push(
                    `/auth/verify-email?email=${data.email}`,
                    "root",
                    "replace",
                );
            }
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
