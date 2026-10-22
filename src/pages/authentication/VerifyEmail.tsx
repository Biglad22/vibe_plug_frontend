import {
    IonButton,
    IonContent,
    IonInput,
    IonInputOtp,
    IonPage,
    IonText,
} from "@ionic/react";
import { Control, Controller, useWatch } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";
import z from "zod";
import useEmailVerification, {
    EmailVerificationOtpFormSchema,
} from "../../services/authentication/hooks/useEmailVerification";
import { useEffect } from "react";

type OTPFormProps = {
    control: Control<z.infer<typeof EmailVerificationOtpFormSchema>>;
};

function OTPInput(props: OTPFormProps) {
    return (
        <div>
            <Controller
                name="otp"
                control={props.control}
                render={({ field, fieldState }) => (
                    <IonInputOtp
                        {...field}
                        onIonInput={field.onChange}
                        fill="outline"
                        color="light"
                        className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                        length={6}
                        type="number"
                    />
                )}
            />
        </div>
    );
}

export default function VerifyEmail() {
    const location = useLocation();

    const {
        otpFormMethod,
        isTiming,
        currentTime,
        requestEmailVerificationOtp,
        canVerify,
    } = useEmailVerification();

    useEffect(() => {
        const email_from_route = new URLSearchParams(location.search).get(
            "email",
        );
        if (email_from_route?.trim()) {
            otpFormMethod.setValue("email", email_from_route);
        }
    }, []);

    const email = useWatch({
        control: otpFormMethod.control,
        name: "email",
    });

    return (
        <IonPage>
            <IonContent className="ion-padding justify-center items-center">
                <div className="text-center h-full flex flex-col items-center justify-center space-y-6 w-full mx-auto">
                    <div>
                        <IonText color={"light"} className="space-y-4">
                            <h1>Your email is not verified yet!</h1>
                            <p>
                                To take full advantage of our services, please
                                confirm that you own this email
                            </p>
                            <Controller
                                name="email"
                                control={otpFormMethod.control}
                                render={({ field, fieldState }) => (
                                    <IonInput
                                        {...field}
                                        onIonInput={field.onChange}
                                        fill="outline"
                                        color="light"
                                        className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                        type="text"
                                        errorText={fieldState.error?.message}
                                        placeholder="awesome@gmail.com"
                                    />
                                )}
                            />

                            {canVerify && (
                                <div>
                                    <OTPInput control={otpFormMethod.control} />
                                    <IonText>
                                        <small>
                                            OTP has been sent to {email}
                                        </small>
                                    </IonText>
                                </div>
                            )}
                        </IonText>
                    </div>
                    <div className="flex items-center gap-4 justify-center">
                        <IonButton
                            type="button"
                            disabled={isTiming}
                            onClick={requestEmailVerificationOtp}
                        >
                            {isTiming
                                ? `Request in ${currentTime}`
                                : "Request verification"}
                        </IonButton>
                        <IonButton
                            routerLink="/dashboard/home"
                            color={"secondary"}
                            fill="outline"
                            type="button"
                        >
                            skip
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
