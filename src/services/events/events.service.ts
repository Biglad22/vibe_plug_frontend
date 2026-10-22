import { AxiosRequestConfig } from "axios";
import axiosInstance, { useLocalStorage } from "..";
import {
    AllEventTicketTier,
    Event,
    EventKeyPermission,
    EventKeyResponse,
    EventPatch,
    EventTicketTier,
    NewEvent,
    NewEventTicketTier,
} from "../../types/services/eventTypes";
import {
    isProtectedHeader,
    SERVICE_HEADER_KEYS,
} from "../../constants/services/headers";
import {
    MessageDataResponse,
    MessageResponse,
} from "../../types/services/generics";

export const eventServices = {
    GET_EVENT_HEADER: async (): Promise<AxiosRequestConfig["headers"]> => {
        const { getDeviceId } = useLocalStorage();
        const device_id = await getDeviceId();
        return {
            ...isProtectedHeader,
            [SERVICE_HEADER_KEYS.deviceId]: device_id,
        };
    },

    /**
     *
     * Create new event
     */
    async createNewEvent(
        formData: NewEvent,
    ): Promise<MessageDataResponse<Event>> {
        const res = await axiosInstance.post("/events/", formData, {
            headers: await this.GET_EVENT_HEADER(),
        });
        return res.data;
    },

    /**
     *
     * get all user events
     */

    async getEventAllEvent(query?: {
        limit?: `${number}`;
        page?: `${number}`;
    }): Promise<AllEventTicketTier> {
        let reqParam = new URLSearchParams(query);

        const res = await axiosInstance.get(`/events?${reqParam.toString()}`, {
            headers: await this.GET_EVENT_HEADER(),
        });
        return res.data;
    },

    /**
     *
     * get event by id
     */
    async getEventById(event_id: number): Promise<MessageDataResponse<Event>> {
        const res = await axiosInstance.get(`/events/${event_id}`, {
            headers: await this.GET_EVENT_HEADER(),
        });
        return res.data;
    },

    /**
     *
     * update event
     */
    async patchEventById(
        event_id: number,
        patch: Partial<Event>,
    ): Promise<MessageDataResponse<EventPatch>> {
        const res = await axiosInstance.patch(`/events/${event_id}`, patch, {
            headers: await this.GET_EVENT_HEADER(),
        });
        return res.data;
    },

    /**
     *
     * Generate new event key
     */
    async generateEventApiKey(
        event_id: number,
        formData: { permission: EventKeyPermission },
    ): Promise<EventKeyResponse> {
        const res = await axiosInstance.post(
            `/events/${event_id}/key`,
            formData,
            {
                headers: await this.GET_EVENT_HEADER(),
            },
        );
        return res.data;
    },

    /**
     *
     * Revoke event key
     */
    async revokeEventApiKey(event_id: number): Promise<MessageResponse> {
        const res = await axiosInstance.delete(`/events/${event_id}/key`, {
            headers: await this.GET_EVENT_HEADER(),
        });
        return res.data;
    },

    /**
     *
     * create event ticket tier
     */
    async createEventTicketTier(
        event_id: number,
        formData: NewEventTicketTier,
    ): Promise<MessageDataResponse<EventTicketTier>> {
        const res = await axiosInstance.post(
            `/events/${event_id}/ticket-tiers`,
            formData,
            {
                headers: await this.GET_EVENT_HEADER(),
            },
        );
        return res.data;
    },

    /**
     *
     * get all event ticket tier
     */
    async getAllEventTicketTier(event_id: number): Promise<AllEventTicketTier> {
        const res = await axiosInstance.get(
            `/events/${event_id}/ticket-tiers`,
            {
                headers: await this.GET_EVENT_HEADER(),
            },
        );
        return res.data;
    },

    /**
     *
     * get event ticket tier by id
     */
    async getEventTicketTier(
        event_id: number,
        ticket_tier_id: number,
    ): Promise<MessageDataResponse<EventTicketTier>> {
        const res = await axiosInstance.get(
            `/events/${event_id}/ticket-tiers/${ticket_tier_id}`,
            {
                headers: await this.GET_EVENT_HEADER(),
            },
        );
        return res.data;
    },

    /**
     *
     * patch event ticket tier by id
     */
    async patchEventTicketTier(
        event_id: number,
        ticket_tier_id: number,
        patch: Partial<NewEventTicketTier>,
    ): Promise<MessageDataResponse<EventTicketTier>> {
        const res = await axiosInstance.patch(
            `/events/${event_id}/ticket-tiers/${ticket_tier_id}`,
            patch,
            {
                headers: await this.GET_EVENT_HEADER(),
            },
        );
        return res.data;
    },

    /**
     *
     * patch event ticket tier by id
     */
    async deleteEventTicketTier(
        event_id: number,
        ticket_tier_id: number,
    ): Promise<MessageResponse> {
        const res = await axiosInstance.delete(
            `/events/${event_id}/ticket-tiers/${ticket_tier_id}`,
            {
                headers: await this.GET_EVENT_HEADER(),
            },
        );
        return res.data;
    },
};
