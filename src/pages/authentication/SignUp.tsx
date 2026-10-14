import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCheckbox,
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
import { chevronBack, eye, eyeOff } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import SelectField from "../../components/ui/SelectField";
import {
    useSignUp,
    useUsernameAvailability,
} from "../../services/authentication";
import institutionService from "../../services/authentication/services/institutionService";
import { SelectOption } from "../../types/generics";

const SignUp: React.FC = () => {
    const { form: formMethods, isBusy, onSubmit } = useSignUp();
    const {
        checkAvailability,
        error: usernameCheckError,
        isLoading: usernameCheckIsLoading,
    } = useUsernameAvailability();
    const ref = useRef<HTMLAnchorElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const getSchools = async (): Promise<SelectOption[]> => {
        return (await institutionService.getAllInstitutions()).map(
            ({ id, name }) => ({ label: name, value: id }),
        );
    };

    useEffect(() => {
        ref.current?.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }, [ref]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-padding-horizontal">
                        Create account
                    </IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="start" icon={chevronBack} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
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
                            <div className="mb-6">
                                <IonText color={"light"}>
                                    <p>
                                        It takes a minute. You'll be creating
                                        your first event right after.
                                    </p>
                                </IonText>
                            </div>

                            <form
                                className="grid gap-4 grid-cols-1 sm:grid-cols-2"
                                onSubmit={onSubmit}
                            >
                                {/* Full Name */}
                                <div>
                                    <IonLabel>Full Name*</IonLabel>
                                    <Controller
                                        name="full_name"
                                        control={formMethods.control}
                                        render={({ field, fieldState }) => (
                                            <IonInput
                                                {...field}
                                                onIonInput={field.onChange}
                                                fill="outline"
                                                color="light"
                                                type="text"
                                                placeholder="Surname first"
                                                maxlength={55}
                                                errorText={
                                                    fieldState.error?.message
                                                }
                                                className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                            />
                                        )}
                                    />
                                </div>

                                {/* Username */}
                                <div>
                                    <IonLabel>Username*</IonLabel>
                                    <Controller
                                        name="user_name"
                                        control={formMethods.control}
                                        render={({ field, fieldState }) => (
                                            <IonInput
                                                // Spread value and onBlur, but handle onChange manually
                                                // to correctly extract the value from Ionic's event
                                                value={field.value}
                                                onBlur={field.onBlur}
                                                name={field.name}
                                                ref={field.ref}
                                                onIonInput={async (e) => {
                                                    const value =
                                                        e.detail.value?.toString() ||
                                                        "";
                                                    field.onChange(value);
                                                    await checkAvailability(
                                                        value,
                                                    );
                                                }}
                                                fill="outline"
                                                color="light"
                                                debounce={1000}
                                                maxlength={55}
                                                type="text"
                                                placeholder="username123"
                                                errorText={
                                                    fieldState.error?.message ||
                                                    usernameCheckError ||
                                                    undefined
                                                }
                                                className={`${fieldState.invalid || usernameCheckError ? "ion-invalid ion-touched" : ""}`}
                                            >
                                                <div
                                                    slot="end"
                                                    className={
                                                        usernameCheckIsLoading
                                                            ? "block"
                                                            : "hidden"
                                                    }
                                                >
                                                    <IonSpinner name="crescent" />
                                                </div>
                                            </IonInput>
                                        )}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <IonLabel>Email*</IonLabel>
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
                                                placeholder="awesome@gmail.com"
                                                errorText={
                                                    fieldState.error?.message
                                                }
                                                className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                            />
                                        )}
                                    />
                                </div>

                                {/* School */}
                                <Controller
                                    name="institution_id"
                                    control={formMethods.control}
                                    render={({ field, fieldState }) => (
                                        <SelectField
                                            label="School"
                                            value={field.value ?? ""}
                                            options={getSchools}
                                            placeholder="Select your school"
                                            onChange={field.onChange}
                                            errorText={
                                                fieldState.error?.message
                                            }
                                            className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                        />
                                    )}
                                />

                                {/* Bio */}
                                <div>
                                    <IonLabel>Bio</IonLabel>
                                    <Controller
                                        name="bio"
                                        control={formMethods.control}
                                        render={({ field, fieldState }) => (
                                            <IonInput
                                                {...field}
                                                onIonInput={field.onChange}
                                                fill="outline"
                                                color="light"
                                                type="text"
                                                placeholder="Tell us about yourself"
                                                errorText={
                                                    fieldState.error?.message
                                                }
                                                className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                            />
                                        )}
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <IonLabel>Password*</IonLabel>
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
                                                        fieldState.error
                                                            ?.message
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
                                                                (value) =>
                                                                    !value,
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
                                                <IonText>
                                                    <small>
                                                        At least 8 characters
                                                    </small>
                                                </IonText>
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <IonLabel>Confirm Password*</IonLabel>
                                    <Controller
                                        name="confirm_password"
                                        control={formMethods.control}
                                        render={({ field, fieldState }) => (
                                            <IonInput
                                                {...field}
                                                onIonInput={field.onChange}
                                                fill="outline"
                                                color="light"
                                                type={
                                                    showConfirmPassword
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
                                                        showConfirmPassword
                                                            ? "Hide confirm password"
                                                            : "Show confirm password"
                                                    }
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            (value) => !value,
                                                        )
                                                    }
                                                    className="ion-no-padding"
                                                >
                                                    <IonIcon
                                                        icon={
                                                            showConfirmPassword
                                                                ? eyeOff
                                                                : eye
                                                        }
                                                        color="medium"
                                                    />
                                                </IonButton>
                                            </IonInput>
                                        )}
                                    />
                                </div>
                                <div className="space-y-4 sm:col-span-2">
                                    <IonCheckbox labelPlacement="end">
                                        <span>I read and agree to the</span>
                                        <button
                                            type="button"
                                            className="text-primary ml-2"
                                        >
                                            Terms and Privacy Policy
                                        </button>
                                    </IonCheckbox>
                                    <IonButton
                                        expand="block"
                                        size="large"
                                        type="submit"
                                        className="w-full"
                                    >
                                        {isBusy ? (
                                            <IonSpinner name="crescent" />
                                        ) : (
                                            "Sign Up"
                                        )}
                                    </IonButton>
                                </div>
                            </form>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-padding-vertical">
                        <IonCol>
                            <IonText color={"light"}>
                                <p className="space-x-2 text-center">
                                    <span>Already have an account?</span>
                                    <Link
                                        ref={ref}
                                        to={"/auth/sign-in"}
                                        className="font-medium text-primary underline"
                                    >
                                        Sign In
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

export default SignUp;
