import z from "zod";
import { newAddressSchema } from "../address/newAddress";

export const newEventTicketTier = z.object({
    title: z.string(),
    total_quantity: z.number().optional(),
    available_quantity: z.number().optional(),
    price: z.number(),
});

export const newEventSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    close_date: z.string().optional(),
    address_id: z.number().optional(),
    address: newAddressSchema.optional(),
    ticket_tiers: z.array(newEventTicketTier).min(1),
});
