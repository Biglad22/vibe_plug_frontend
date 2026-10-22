import z from "zod";

export const newAddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
});
