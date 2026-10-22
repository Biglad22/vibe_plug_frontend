import {
    IonButton,
    IonContent,
    IonIcon,
    IonInput,
    IonInputOtp,
    IonLabel,
    IonPage,
    IonText,
} from "@ionic/react";
import { refreshCircle } from "ionicons/icons";
import { Controller } from "react-hook-form";
import usePasswordReset from "../../services/authentication/hooks/usePasswordReset";

type Props = {
    label: string;
    onClick: () => Promise<void> | void;
    isBusy?: boolean;
};

function TokenRequestButton(props: Props) {
    return (
        <button
            onClick={props.onClick}
            type="button"
            className="text-xs sm:text-sm text-primary disabled:opacity-80 opacity-100 flex items-center gap-1 font-medium"
            disabled={props.isBusy}
        >
            <IonIcon icon={refreshCircle} size="small" />
            <span>{props.label}</span>
        </button>
    );
}

export default function RequestPassword() {
    const {
        formMethod,
        requestPasswordResetOtp,
        resetPassword,
        currentTime,
        isTiming,
    } = usePasswordReset();
    return (
        <IonPage>
            <IonContent className="ion-padding justify-center items-center">
                <div className=" h-full min-h-fit flex flex-col items-center justify-center space-y-6 w-full mx-auto">
                    <div className="text-center">
                        <IonText color={"light"} className="space-y-4">
                            <h1>You forgot your password huh?</h1>
                            <p>
                                No worries just request for a new password.
                                Request an OTP first so we are sure this is you.
                            </p>
                        </IonText>
                    </div>
                    <form
                        onSubmit={resetPassword}
                        className="space-y-4 w-full max-w-xl"
                    >
                        <div>
                            <IonLabel>Email</IonLabel>
                            <Controller
                                name="email"
                                control={formMethod.control}
                                render={({ field, fieldState }) => (
                                    <IonInput
                                        {...field}
                                        onIonInput={field.onChange}
                                        fill="outline"
                                        color="light"
                                        className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                        errorText={fieldState.error?.message}
                                        type="text"
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <IonLabel>New Password</IonLabel>
                            <Controller
                                name="password"
                                control={formMethod.control}
                                render={({ field, fieldState }) => (
                                    <IonInput
                                        {...field}
                                        onIonInput={field.onChange}
                                        fill="outline"
                                        color="light"
                                        className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                        errorText={fieldState.error?.message}
                                        type="text"
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <IonLabel>New Password</IonLabel>
                            <Controller
                                name="password"
                                control={formMethod.control}
                                render={({ field, fieldState }) => (
                                    <IonInput
                                        {...field}
                                        onIonInput={field.onChange}
                                        fill="outline"
                                        color="light"
                                        className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                        errorText={fieldState.error?.message}
                                        type="text"
                                    />
                                )}
                            />
                        </div>
                        <div className="p-2">
                            <div className="flex items-start gap-2 justify-between w-full">
                                <IonLabel>OTP</IonLabel>
                                <TokenRequestButton
                                    onClick={requestPasswordResetOtp}
                                    isBusy={isTiming}
                                    label={
                                        isTiming
                                            ? `Retry in ${currentTime}`
                                            : "Request OTP"
                                    }
                                />
                            </div>
                            <Controller
                                name="token"
                                control={formMethod.control}
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
                            <IonText className="text-center">
                                <small className="block">
                                    OTP has been sent to your email
                                </small>
                            </IonText>
                        </div>
                        <div className="flex flex-col gap-4  w-full">
                            <IonButton
                                type="button"
                                size="default"
                                expand="block"
                            >
                                Request password
                            </IonButton>
                            <IonButton
                                routerLink="/auth/sign-in"
                                color={"light"}
                                fill="clear"
                                type="button"
                            >
                                Remember Password?
                            </IonButton>
                        </div>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
}
