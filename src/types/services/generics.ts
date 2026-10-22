export interface MessageResponse {
    message: string;
}

export interface MessageDataResponse<T extends any> {
    message: string;
    data: T;
}


export interface PaginatedResponse<T extends any>{
    count:number;
    page:number;
    data:T;
}