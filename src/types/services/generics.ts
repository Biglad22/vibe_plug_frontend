export interface MessageResponse {
    message: string;
}

export interface MessageDataResponse<T extends any> {
    message: string;
    data: T;
}


