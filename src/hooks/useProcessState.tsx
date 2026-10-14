import { useState } from "react";
type ProcessStatus = "idle" | "busy" | "error";

interface UseProcessStateReturn {
    isLoading: boolean;
    status: ProcessStatus;
    setIsLoading: (v: boolean) => void;
    error: string | null;
    setError: (v: string) => void;
    clearError: () => void;
}

export function useProcessState(): UseProcessStateReturn {
    const [status, setStatus] = useState<ProcessStatus>("idle");
    const [error, __setError__] = useState<string | null>(null);

    const setIsLoading = (v: boolean) => {
        if (!v && status !== "error") return setStatus("idle");
        setStatus("busy");
    };

    const clearError = () => __setError__(null);
    const onHandleError = (v: string) => {
        __setError__(v);
        setStatus("error");
    };
    return {
        isLoading: status === "busy",
        setIsLoading,
        status,
        error,
        setError: onHandleError,
        clearError,
    };
}
