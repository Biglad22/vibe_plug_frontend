import {
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-padding-horizontal">Home</IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton autoHide />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Home</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonText>
                                <h3>Active Events</h3>
                            </IonText>
                            <div className="flex items-auto gap-4 overflow-auto w-full">
                                <Link
                                    className="p-6 border border-dashed flex items-center justify-center h-full border-medium rounded-lg"
                                    to="/dashboard/event/new"
                                >
                                    <div>
                                        <IonText color={"light"}>
                                            <h6>Create Event</h6>
                                        </IonText>
                                    </div>
                                </Link>

                                <IonCard className="p-4 sm:p-6 w-fit">
                                    <IonCardHeader>
                                        <IonCardTitle>Event Title</IonCardTitle>
                                        <IonCardSubtitle>
                                            Created yesterday
                                        </IonCardSubtitle>
                                    </IonCardHeader>

                                    <div className="space">
                                        <IonText>
                                            <h2 className=" text-light">
                                                Av. Tickets
                                            </h2>
                                            <h6 className="">Av. Tickets</h6>
                                        </IonText>
                                    </div>
                                </IonCard>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;
