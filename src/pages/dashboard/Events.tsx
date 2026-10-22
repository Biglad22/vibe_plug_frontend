import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

const Events: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="page-header">
                <IonToolbar>
                    <IonTitle className="ion-padding-horizontal">
                        Events
                    </IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton autoHide />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
               <div>
                <small>
                    Count:
                </small>
               </div>
            </IonContent>
        </IonPage>
    );
};

export default Events;
