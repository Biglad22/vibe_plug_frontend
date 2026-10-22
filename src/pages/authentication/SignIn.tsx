import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonLabel,
    IonPage,
    IonRow,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Divider from "../../components/ui/Divider";
import { useSignIn } from "../../services/authentication";
import { Controller } from "react-hook-form";

const SignIn: React.FC = () => {
    const { formMethods, isLoading, onSubmit } = useSignIn();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol
                            size="12"
                            offsetSm="2"
                            offsetMd="3"
                            sizeMd="6"
                            sizeSm="8"
                        >
                            <div className="mb-6 text-center">
                                <IonText color={"light"}>
                                    <h1 className="font-bold">
                                        Sell tickets to your event in minutes.
                                    </h1>
                                </IonText>
                                <IonText color={"medium"}>
                                    <p>
                                        Create an event, issue tickets, and
                                        check people in at the gate.
                                    </p>
                                </IonText>
                            </div>

                            <form className="space-y-4" onSubmit={onSubmit}>
                                <IonLabel>Email</IonLabel>

                                <Controller
                                    name="email"
                                    control={formMethods.control}
                                    render={({ field, fieldState }) => (
                                        <IonInput
                                            {...field}
                                            onIonInput={field.onChange}
                                            fill="outline"
                                            color="light"
                                            type="text"
                                            errorText={
                                                fieldState.error?.message
                                            }
                                            className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                            placeholder="awesome@gmail.com"
                                        />
                                    )}
                                />
                                <IonLabel>Password</IonLabel>
                                <Controller
                                    name="password"
                                    control={formMethods.control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <IonInput
                                                {...field}
                                                onIonInput={field.onChange}
                                                fill="outline"
                                                color="light"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="xxxxxxx"
                                                errorText={
                                                    fieldState.error?.message
                                                }
                                                className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                            >
                                                <IonButton
                                                    slot="end"
                                                    fill="clear"
                                                    type="button"
                                                    aria-label={
                                                        showPassword
                                                            ? "Hide password"
                                                            : "Show password"
                                                    }
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (value) => !value,
                                                        )
                                                    }
                                                    className="ion-no-padding"
                                                >
                                                    <IonIcon
                                                        icon={
                                                            showPassword
                                                                ? eyeOff
                                                                : eye
                                                        }
                                                        color="medium"
                                                    />
                                                </IonButton>
                                            </IonInput>
                                        </>
                                    )}
                                />
                                <div className="pt-1">
                                    <Link
                                        to={"/auth/reset-password"}
                                        className="font-medium text-primary"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <IonButton
                                    expand="block"
                                    size="large"
                                    type="submit"
                                >
                                    {isLoading ? (
                                        <IonSpinner name="crescent" />
                                    ) : (
                                        "Sign In"
                                    )}
                                </IonButton>
                                <Divider children="or" />
                                <IonButton
                                    expand="block"
                                    size="large"
                                    type="button"
                                    color={"secondary"}
                                    routerLink=""
                                >
                                    Continue With Google
                                </IonButton>
                            </form>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-padding-vertical">
                        <IonCol>
                            <IonText color={"light"}>
                                <p className="space-x-2 text-center">
                                    <span>New here?</span>
                                    <Link
                                        to={"/auth/sign-up"}
                                        className="font-medium text-primary underline"
                                    >
                                        Create an account
                                    </Link>
                                </p>
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default SignIn;
