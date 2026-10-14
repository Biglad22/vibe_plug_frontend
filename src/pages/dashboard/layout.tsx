import {
    IonContent,
    IonHeader,
    IonMenu,
    IonPage,
    IonSplitPane,
    IonTitle,
    IonToolbar,
    IonRouterOutlet,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonMenuToggle,
} from "@ionic/react";
import React from "react";
import { Navigate, NavLink, NavLinkRenderProps, Route } from "react-router-dom";
import Home from "./Home";
import { home, calendar, codeSlash, person, settings } from "ionicons/icons";
import Events from "./Events";
import Api from "./Api";
import Profile from "./Profile";

const dashboardLinks = [
    { label: "Home", to: "/dashboard/home", icon: home },
    { label: "Events", to: "/dashboard/events", icon: calendar },
    { label: "API", to: "/dashboard/api", icon: codeSlash },
];
const dashboardBottomLinks = [
    { label: "Profile", to: "/dashboard/profile", icon: person },
    { label: "Settings", to: "/dashboard/settings", icon: settings },
];
const DashboardLayout: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonSplitPane contentId="menuContent" when="sm">
                    <IonMenu contentId="menuContent">
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle className="ion-padding-horizontal">
                                    Dashboard
                                </IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent>
                            <div className="h-full flex flex-col gap-4 ion-padding-vertical">
                                <div className="flex-1">
                                    {dashboardLinks.map(
                                        ({ icon, label, to }) => (
                                            <IonMenuToggle autoHide={false}>
                                                <NavLink
                                                    to={to}
                                                    className={({
                                                        isActive,
                                                    }: NavLinkRenderProps) =>
                                                        `flex items-center gap-4 border-r-4  py-3 ion-padding-horizontal ${isActive ? "text-primary border-primary " : "text-light border-transparent"} transition-all duration-500`
                                                    }
                                                >
                                                    <IonIcon
                                                        aria-hidden="true"
                                                        size="small"
                                                        icon={icon}
                                                    />
                                                    <IonLabel>{label}</IonLabel>
                                                </NavLink>
                                            </IonMenuToggle>
                                        ),
                                    )}
                                </div>
                                <div>
                                    {dashboardBottomLinks.map(
                                        ({ icon, label, to }) => (
                                            <IonMenuToggle autoHide={false}>
                                                <NavLink
                                                    to={to}
                                                    className={({
                                                        isActive,
                                                    }: NavLinkRenderProps) =>
                                                        `flex items-center gap-4 border-r-4  py-3 ion-padding-horizontal ${isActive ? "text-primary border-primary " : "text-light border-transparent"} transition-all duration-500`
                                                    }
                                                >
                                                    <IonIcon
                                                        aria-hidden="true"
                                                        size="small"
                                                        icon={icon}
                                                    />
                                                    <IonLabel>{label}</IonLabel>
                                                </NavLink>
                                            </IonMenuToggle>
                                        ),
                                    )}
                                </div>
                            </div>
                        </IonContent>
                    </IonMenu>

                    <IonRouterOutlet id="menuContent">
                        <Route path={`home`} element={<Home />} />
                        <Route path={`events`} element={<Events />} />
                        <Route path={`api`} element={<Api />} />
                        <Route path={`profile`} element={<Profile />} />
                        <Route
                            path="/dashboard/"
                            element={<Navigate to={`home`} replace />}
                        />
                    </IonRouterOutlet>
                </IonSplitPane>
            </IonContent>
        </IonPage>
    );
};

export default DashboardLayout;
