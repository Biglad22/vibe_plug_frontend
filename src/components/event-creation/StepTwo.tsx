import { IonLabel, IonInput, IonIcon, IonText } from "@ionic/react";
import {
    Control,
    Controller,
    useFieldArray,
    useFormContext,
    useWatch,
} from "react-hook-form";
import z from "zod";
import { newEventSchema } from "../../schemas/events/newEvent";
import { add, remove } from "ionicons/icons";

function TicketTierFormCard(props: {
    index: number;
    onRemove: () => void;
    control: Control<z.infer<typeof newEventSchema>>;
}) {
    const title = useWatch({
        control: props.control,
        name: `ticket_tiers.${props.index}.title`,
    });
    return (
        <div className="bg-surface dark:bg-dark-surface rounded-2xl space-y-4 shadow-sm border-border border p-4 sm:p-6">
            <div className="flex w-full items-center justify-between gap-4">
                <IonText>
                    <h6 className="capitalize m-0!">
                        {`${title} Tier` || "ticket tier"}
                    </h6>
                </IonText>
                <button
                    type="button"
                    className=" rounded-full"
                    onClick={props.onRemove}
                >
                    <IonIcon icon={remove} size="large" color="primary" />
                </button>
            </div>

            <div>
                <IonLabel>Tier name*</IonLabel>
                <Controller
                    name={`ticket_tiers.${props.index}.title`}
                    control={props.control}
                    render={({ field, fieldState }) => (
                        <IonInput
                            {...field}
                            onIonInput={field.onChange}
                            fill="outline"
                            color="light"
                            placeholder="e.g Regular"
                            className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                            type="text"
                        />
                    )}
                />
            </div>
            <div>
                <IonLabel>Price</IonLabel>
                <Controller
                    name={`ticket_tiers.${props.index}.price`}
                    control={props.control}
                    render={({ field, fieldState }) => (
                        <IonInput
                            {...field}
                            onIonInput={field.onChange}
                            fill="outline"
                            color="light"
                            placeholder="[YOUR PRICE]"
                            className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                            type="number"
                        />
                    )}
                />
            </div>
            <div className="flex items-center flex-wrap gap-4 w-full">
                <div className="flex-1 min-w-28">
                    <IonLabel>Available Quantity</IonLabel>
                    <Controller
                        name={`ticket_tiers.${props.index}.available_quantity`}
                        control={props.control}
                        render={({ field, fieldState }) => (
                            <IonInput
                                {...field}
                                onIonInput={field.onChange}
                                fill="outline"
                                color="light"
                                placeholder="[YOUR PRICE]"
                                className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                type="number"
                            />
                        )}
                    />
                </div>
                <div className="flex-1 min-w-40">
                    <IonLabel>Total Quantity</IonLabel>
                    <Controller
                        name={`ticket_tiers.${props.index}.total_quantity`}
                        control={props.control}
                        render={({ field, fieldState }) => (
                            <IonInput
                                {...field}
                                onIonInput={field.onChange}
                                fill="outline"
                                color="light"
                                placeholder="[TICKETS]"
                                className={`${fieldState.invalid ? "ion-invalid ion-touched" : ""}`}
                                type="number"
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

/**
 *
 * event ticket tiers
 */
export const StepTwo = () => {
    const { control } = useFormContext<z.infer<typeof newEventSchema>>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "ticket_tiers",
    });
    const handleRemoval = (idx: number) => remove(idx);
    const handleAppend = () =>
        append({
            price: 0,
            total_quantity: 0,
            title: "",
            available_quantity: 0,
        });
    return (
        <>
            <div>
                <IonText color={"light"}>
                    <h3>Event Ticket Tier</h3>
                </IonText>
            </div>
            {fields.map((_, idx) => (
                <TicketTierFormCard
                    onRemove={() => handleRemoval(idx)}
                    control={control}
                    index={idx}
                />
            ))}

            <button
                onClick={handleAppend}
                type="button"
                className="text-primary flex items-center gap-2 p-4! justify-center rounded-xl! border-2! border-primary border-dashed w-full"
            >
                <IonIcon icon={add} color="primary" />
                <p>Add another tier</p>
            </button>
        </>
    );
};
