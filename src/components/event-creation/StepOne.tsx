import { IonInput, IonLabel, IonText, IonTextarea } from "@ionic/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import z from "zod";
import { newEventSchema } from "../../schemas/events/newEvent";

/***
 * event basic information
 */
export default function StepOne() {
    const { control } = useFormContext<z.infer<typeof newEventSchema>>();
    return (
        <>
            <div>
                <IonText color={"light"}>
                    <h3>Event Information</h3>
                </IonText>
            </div>
            <div>
                <IonLabel>Title</IonLabel>
                <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState }) => (
                        <IonInput
                            {...field}
                            onIonInput={field.onChange}
                            fill="outline"
                            color="light"
                            placeholder="e.g Freshers' Night"
                            className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                            type="text"
                        />
                    )}
                />
            </div>
            <div>
                <IonLabel>Venue</IonLabel>
                <Controller
                    name="address.street"
                    control={control}
                    render={({ field, fieldState }) => (
                        <IonInput
                            {...field}
                            onIonInput={field.onChange}
                            fill="outline"
                            color="light"
                            className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                            type="text"
                        />
                    )}
                />
            </div>
            <div>
                <IonLabel>Description</IonLabel>
                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState }) => (
                        <IonTextarea
                            {...field}
                            onIonInput={field.onChange}
                            fill="outline"
                            color="light"
                            placeholder="Tell us about this event"
                            errorText={fieldState.error?.message}
                            className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                        />
                    )}
                />
            </div>
        </>
    );
}
