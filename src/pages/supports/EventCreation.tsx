import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonPage,
    IonRow,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React from "react";
import { FormProvider } from "react-hook-form";
import useEventCreation from "../../services/events/hooks/useEventCreation";
import StepOne from "../../components/event-creation/StepOne";
import { StepTwo } from "../../components/event-creation/StepTwo";
import StepThree from "../../components/event-creation/StepThree";

const EventCreation: React.FC = () => {
    const {
        formMethod,
        handleSubmission,
        currentStep,
        moveToNext,
        moveToPrev,
        isLoading,
        event_id,
    } = useEventCreation();

    return (
        <IonPage>
            <IonHeader className="page-header">
                <IonToolbar className="ion-padding-horizontal">
                    <IonTitle>Create new event</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" offsetMd="2" sizeMd="8">
                            <FormProvider {...formMethod}>
                                <form
                                    onSubmit={handleSubmission}
                                    className="w-full space-y-4"
                                >
                                    {currentStep == 0 && <StepOne />}
                                    {currentStep == 1 && <StepTwo />}
                                    {currentStep == 2 && <StepThree />}
                                    <div className="flex items-center flex-wrap gap-2">
                                        {currentStep > 0 && (
                                            <IonButton
                                                expand="block"
                                                size="large"
                                                className="flex-1 min-w-fit"
                                                type="button"
                                                fill="outline"
                                                color={"light"}
                                                onClick={moveToPrev}
                                            >
                                                prev
                                            </IonButton>
                                        )}
                                        {currentStep < 2 ? (
                                            <IonButton
                                                expand="block"
                                                size="large"
                                                type="submit"
                                                disabled={currentStep < 1}
                                                className="flex-1 min-w-fit"
                                            >
                                                {isLoading ? (
                                                    <IonSpinner name="crescent" />
                                                ) : (
                                                    "Publish event"
                                                )}
                                            </IonButton>
                                        ) : (
                                            <IonButton
                                                expand="block"
                                                size="large"
                                                type="button"
                                                color={"light"}
                                                routerLink={
                                                    event_id
                                                        ? `/dashboard/events/${event_id}`
                                                        : "/dashboard/events"
                                                }
                                                className="flex-1 min-w-fit"
                                            >
                                                Open event
                                            </IonButton>
                                        )}
                                        {currentStep < 1 && (
                                            <IonButton
                                                expand="block"
                                                size="large"
                                                type="button"
                                                fill="outline"
                                                color={"light"}
                                                onClick={moveToNext}
                                                className="flex-1 min-w-fit"
                                            >
                                                next
                                            </IonButton>
                                        )}
                                    </div>
                                </form>
                            </FormProvider>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default EventCreation;
