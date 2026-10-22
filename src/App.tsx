import { Navigate, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import SignIn from "./pages/authentication/SignIn";

// Tailwind CSS
import "./theme/theme.css";
import SignUp from "./pages/authentication/SignUp";
import DashboardLayout from "./pages/dashboard/layout";
import RouteGuard from "./context/RouteGuard";
import VerifyEmail from "./pages/authentication/VerifyEmail";
import RequestPassword from "./pages/authentication/ResetPassword";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route
                    path="/"
                    element={<Navigate to="/auth/sign-in" replace />}
                />
                <Route
                    path="/dashboard/*"
                    element={
                        <RouteGuard>
                            <DashboardLayout />
                        </RouteGuard>
                    }
                />
                <Route path="/auth/verify-email" element={<VerifyEmail />} />
                <Route
                    path="/auth/reset-password"
                    element={<RequestPassword />}
                />
                <Route path="/ticket-scanner" />
                <Route path="/auth/sign-in" element={<SignIn />} />
                <Route path="/auth/sign-up" element={<SignUp />} />
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
