import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="page-header">
                <IonToolbar className="ion-padding-horizontal">
                    <IonTitle>Home</IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton autoHide />
                    </IonButtons>

                    <IonButton
                        slot="end"
                        fill="solid"
                        shape="round"
                        color={"secondary"}
                        size="small"
                        routerLink="/dashboard/events/new"
                    >
                        <IonIcon icon={add} size="medium" />
                        Create Event
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding"></IonContent>
        </IonPage>
    );
};

export default Home;
