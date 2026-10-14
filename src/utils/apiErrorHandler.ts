const STATUS_ERROR_MESSAGES: Record<number, string> = {
    400: "The request could not be processed. Please check your information and try again.",
    401: "Your session has expired. Please sign in again.",
    403: "You do not have permission to perform this action.",
    404: "The requested resource could not be found.",
    409: "This action conflicts with the current state. Please try again.",
    422: "The information provided is invalid. Please review and try again.",
    429: "Too many requests. Please wait a moment and try again.",
    500: "Something went wrong on our side. Please try again later.",
    502: "The service is temporarily unavailable. Please try again later.",
    503: "The service is temporarily unavailable. Please try again later.",
    504: "The service took too long to respond. Please try again later.",
};

const getServerMessage = (error: any): string | undefined => {
    const payload = error?.response?.data ?? error?.data ?? {};

    if (typeof payload?.message === "string" && payload.message.trim()) {
        return payload.message;
    }

    if (typeof payload?.detail === "string" && payload.detail.trim()) {
        return payload.detail;
    }

    if (Array.isArray(payload?.detail) && payload.detail.length > 0) {
        return payload.detail.join(" ");
    }

    if (Array.isArray(payload?.message) && payload.message.length > 0) {
        return payload.message.join(" ");
    }

    return undefined;
};

export const getApiErrorMessage = (error: any): string => {
    const statusCode =
        error?.response?.status ?? error?.status ?? error?.statusCode;
    const serverMessage = getServerMessage(error);

    if (serverMessage) {
        return serverMessage;
    }

    const friendlyMessage = statusCode
        ? STATUS_ERROR_MESSAGES[statusCode]
        : undefined;
    return friendlyMessage ?? error?.message ?? "Something went wrong.";
};

export type APIErrorType = Error & {
    details?: string;
    status?: number;
    statusCode?: number;
    response?: any;
};

export const apiErrorHandler = (error: any): APIErrorType => {
    const statusCode =
        error?.response?.status ?? error?.status ?? error?.statusCode;
    const normalizedError = (
        error instanceof Error ? error : new Error()
    ) as Error & {
        details?: string;
        status?: number;
        statusCode?: number;
        response?: any;
    };
    const serverMessage = getServerMessage(error);
    const message = getApiErrorMessage(error);

    normalizedError.message = message;
    normalizedError.details = serverMessage ?? normalizedError.details;
    normalizedError.status = statusCode;
    normalizedError.statusCode = statusCode;
    normalizedError.response = error?.response ?? normalizedError.response;

    return normalizedError;
};

export default apiErrorHandler;
