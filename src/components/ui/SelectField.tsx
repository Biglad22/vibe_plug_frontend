import { IonLabel, IonSelect, IonSelectOption, IonSpinner } from "@ionic/react";
import React from "react";
import { SelectOption } from "../../types/generics";
import { useSelectOptions } from "../../hooks/useSelectOptions";

type OptionType =
    | SelectOption[]
    | ((isLoading?: boolean) => Promise<SelectOption[]> | SelectOption[]);

export type SelectFieldProps<
    T extends string | number | Array<string | number> | null,
> = Omit<React.ComponentProps<typeof IonSelect>, "value" | "onIonChange"> & {
    label?: React.ReactNode;
    value?: T;
    options: OptionType;
    onChange?: (value: T) => void;
    placeholder?: string;
};

const SelectField = <
    T extends string | number | Array<string | number> | null,
>({
    label,
    value,
    options,
    onChange,
    placeholder = "Select an option",
    className,
    ...rest
}: SelectFieldProps<T>) => {
    const { data: internalOptions, isLoading } = useSelectOptions(options);
    return (
        <div>
            {label ? <IonLabel>{label}</IonLabel> : null}

            <IonSelect
                {...rest}
                value={value ?? undefined}
                onIonChange={(event) =>
                    onChange?.(event.detail.value ?? (null as T))
                }
                fill="outline"
                color="light"
                justify="space-between"
                interface="popover"
                placeholder={placeholder}
                className={className}
            >
                {isLoading && (
                    <IonSelectOption disabled>
                        <IonSpinner name="crescent" />
                    </IonSelectOption>
                )}
                {internalOptions?.map((option) => {
                    if (typeof option === "string") {
                        return (
                            <IonSelectOption key={option} value={option}>
                                {option}
                            </IonSelectOption>
                        );
                    }

                    return (
                        <IonSelectOption
                            key={String(option.value)}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </IonSelectOption>
                    );
                })}
            </IonSelect>
        </div>
    );
};

export default SelectField;
