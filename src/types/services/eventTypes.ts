import { PaginatedResponse } from "./generics";

export type EventKeyPermission =
    | "can_write_only"
    | "can_read_only"
    | "can_write_and_read_only";

export interface NewEventTicketTier {
    title: string;
    total_quantity?: number;
    available_quantity?: number;
    price: number;
}
export interface EventTicketTier extends NewEventTicketTier {
    id: number;
    event_id: number;
    created_at: string;
    updated_at: string;
}

export interface NewEventAddress {
    street: string;
    city: string;
    state: string;
    country: string;
}

export interface EventAddress extends NewEventAddress {
    id: number;
}

export interface EventMedia {
    file_id: number;
    file_name: string;
}

export interface NewEvent {
    title: string;

    description?: string;
    ticket_tiers: Array<NewEventTicketTier>;

    close_date?: string;
    address_id?: number;
    address?: NewEventAddress;
    media?: Array<EventMedia>;
}

export type Event = Omit<NewEvent, "ticket_tiers" | "address"> & {
    id: number;
    creator_id: number;
    address_id: number;
    created_at: string;
};

export type EventPatch = Pick<Event, "title" | "description" | "close_date">;

export interface EventDetails extends Event {
    ticket_tier: EventTicketTier;
    address: EventAddress;
}

export interface EventTicketTierDetails extends EventTicketTier {
    event: Event;
}

export type AllEvents = PaginatedResponse<Array<Event>>;
export type AllEventTicketTier = {
    data: Array<EventTicketTier>;
};
export type EventKeyResponse = {
    message: string;
    key: string;
    permission: EventKeyPermission;
};
