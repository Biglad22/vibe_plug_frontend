import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newEventSchema } from "../../../schemas/events/newEvent";
import { useToast } from "../../../hooks/useToast";
import { useProcessState } from "../../../hooks/useProcessState";
import { eventServices } from "../events.service";
import { useState } from "react";
import { Event } from "../../../types/services/eventTypes";

export default function useEventCreation() {
    const formMethod = useForm({
        resolver: zodResolver(newEventSchema),
    });
    const [step, setStep] = useState<number>(2);
    const { isLoading, setIsLoading } = useProcessState();
    const { present } = useToast();
    const [event_id, set_event_id] = useState<Event["id"] | null>(null);

    const handleSubmission = formMethod.handleSubmit(async (formdata) => {
        try {
            setIsLoading(true);
            const res = await eventServices.createNewEvent(formdata);
            set_event_id(res.data.id);
            setStep(2);
        } catch (error: any) {
            present(
                error.message ||
                    error.details ||
                    "Something went wrong while trying to create event.",
                { type: "error" },
            );
        } finally {
            setIsLoading(false);
        }
    });

    const moveToNext = () => setStep((prev) => Math.min(2, prev + 1));
    const moveToPrev = () => setStep((prev) => Math.min(0, prev - 1));

    return {
        formMethod,
        handleSubmission,
        currentStep: step,
        moveToNext,
        moveToPrev,
        isLoading,
        event_id,
    };
}
