import {
    IonContent,
    IonHeader,
    IonMenu,
    IonPage,
    IonSplitPane,
    IonTitle,
    IonToolbar,
    IonRouterOutlet,
    IonLabel,
    IonIcon,
    IonMenuToggle,
    IonButton,
} from "@ionic/react";
import React, { useMemo } from "react";
import {
    Link,
    Navigate,
    NavLink,
    NavLinkRenderProps,
    Route,
} from "react-router-dom";
import Home from "./Home";
import {
    home,
    calendar,
    codeSlash,
    person,
    settings,
    logOut,
} from "ionicons/icons";
import Events from "./Events";
import Api from "./Api";
import Profile from "./Profile";
import useSignOut from "../../services/authentication/hooks/useSignOut";
import useUserProfile from "../../services/user/hooks/useUserProfile";
import EventCreation from "../supports/EventCreation";

const DashboardLayout: React.FC = () => {
    const { triggerSignOut } = useSignOut();
    const { data } = useUserProfile();

    const dashboardLinks = useMemo(
        () => [
            { label: "Home", to: "/dashboard/home", icon: home },
            { label: "Events", to: "/dashboard/events", icon: calendar },
            { label: "API", to: "/dashboard/api", icon: codeSlash },
        ],
        [],
    );
    const dashboardBottomLinks = useMemo(
        () => [
            {
                label: data?.full_name || "Profile",
                to: "/dashboard/profile",
                icon: person,
            },
            { label: "Settings", to: "/dashboard/settings", icon: settings },
        ],
        [data],
    );

    return (
        <IonPage>
            <IonSplitPane contentId="menuContent" when="md">
                <IonMenu contentId="menuContent">
                    <IonHeader className="page-header">
                        <IonToolbar>
                            <IonTitle className="ion-padding-horizontal">
                                Dashboard
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <div className="h-full flex flex-col gap-2 ion-padding-vertical">
                            {data?.user.verification_tier == "unverified" && (
                                <Link to={"/auth/verify-email"}>
                                    <IonLabel className="block px-4 py-1  shadow-sm font-medium border-r-4 border-secondary text-secondary bg-secondary/5 ">
                                        Verify Account
                                    </IonLabel>
                                </Link>
                            )}
                            <div className="flex-1">
                                {dashboardLinks.map(
                                    ({ icon, label, to }, idx) => (
                                        <IonMenuToggle
                                            autoHide={false}
                                            key={`${label}:${idx}`}
                                        >
                                            <NavLink
                                                to={to}
                                                className={({
                                                    isActive,
                                                }: NavLinkRenderProps) =>
                                                    `flex items-center gap-4 border-r-4  my-2 ion-padding-horizontal ${isActive ? "text-primary border-primary " : "text-light border-transparent"} transition-all duration-500`
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
                                    ({ icon, label, to }, idx) => (
                                        <IonMenuToggle
                                            autoHide={false}
                                            key={`${label}:${idx}`}
                                        >
                                            <NavLink
                                                to={to}
                                                className={({
                                                    isActive,
                                                }: NavLinkRenderProps) =>
                                                    `flex items-center gap-4 border-r-4 my-2 ion-padding-horizontal ${isActive ? "text-primary border-primary " : "text-light border-transparent"} transition-all duration-500`
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
                                <div className="ion-padding-horizontal p-2">
                                    <IonButton
                                        expand="block"
                                        color={"danger"}
                                        size="default"
                                        type="button"
                                        fill="outline"
                                        onClick={triggerSignOut}
                                        className="justify-start"
                                    >
                                        <IonIcon
                                            slot="start"
                                            aria-hidden="true"
                                            size="small"
                                            icon={logOut}
                                        />
                                        <span className="ml-4">Sign out</span>
                                    </IonButton>
                                </div>
                            </div>
                        </div>
                    </IonContent>
                </IonMenu>

                <IonContent id="menuContent">
                    <IonRouterOutlet>
                        <Route path={`home`} element={<Home />} />
                        <Route path={`events`} element={<Events />} />
                        <Route path={`api`} element={<Api />} />
                        <Route path={`profile`} element={<Profile />} />
                        <Route
                            path="/dashboard/"
                            element={<Navigate to={`home`} replace />}
                        />
                        <Route path="events/new" element={<EventCreation />} />
                    </IonRouterOutlet>
                </IonContent>
            </IonSplitPane>
        </IonPage>
    );
};

export default DashboardLayout;
