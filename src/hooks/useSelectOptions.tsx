import { useEffect, useState } from "react";
import { SelectOption } from "../types/generics";
import { useProcessState } from "./useProcessState";
import { useToast } from "./useToast";

export function useSelectOptions<
    T extends
        | SelectOption[]
        | ((isLoading?: boolean) => Promise<SelectOption[]> | SelectOption[]),
>(options: T) {
    const { isLoading, setIsLoading } = useProcessState();
    const [__options__, __setOptions__] = useState<SelectOption[]>([]);
    const { present } = useToast();

    const getOptions = async () => {
        try {
            setIsLoading(true);
            let res: SelectOption[] = [];
            if (typeof options == "function") {
                res = await options(isLoading);
            } else {
                res = options;
            }

            __setOptions__(res);
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
    };

    useEffect(() => {
        getOptions();
    }, []);

    return {
        data: __options__,
        isLoading,
    };
}
