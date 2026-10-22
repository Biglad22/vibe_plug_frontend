import { IonIcon, IonText } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";

export default function StepThree() {
    return (
        <>
            <div className="mx-auto w-fit">
                <IonIcon
                    icon={checkmarkCircle}
                    color="primary"
                    className="h-36 w-36 sm:h-48 sm:w-48 "
                />
            </div>
            <div className="text-center py-4">
                <IonText color={"light"}>
                    <h1>Your event is live</h1>
                </IonText>
                <IonText color={"medium"}>
                    <p>
                        event is ready for use, start generating tickets for
                        your attendees
                    </p>
                </IonText>
            </div>
        </>
    );
}
