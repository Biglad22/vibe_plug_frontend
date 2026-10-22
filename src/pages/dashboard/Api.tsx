import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

const Api: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="page-header">
                <IonToolbar>
                    <IonTitle className="ion-padding-horizontal">Api</IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton autoHide />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Api</IonTitle>
                    </IonToolbar>
                </IonHeader>
            </IonContent>
        </IonPage>
    );
};

export default Api;
