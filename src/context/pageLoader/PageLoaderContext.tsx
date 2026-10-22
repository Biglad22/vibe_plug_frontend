import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { IonBackdrop, IonSpinner } from "@ionic/react";

type PageLoaderContextValue = {
    isLoading: boolean;
    show: () => void;
    hide: () => void;
};

const PageLoaderContext = createContext<PageLoaderContextValue | undefined>(
    undefined,
);

export function PageLoaderProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [visible, setVisible] = useState(false);

    const show = useCallback(() => setVisible(true), []);
    const hide = useCallback(() => setVisible(false), []);

    const value = useMemo(
        () => ({ isLoading: visible, show, hide }),
        [visible, show, hide],
    );

    return (
        <PageLoaderContext.Provider value={value}>
            {children}
            {visible && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        display: "grid",
                        placeItems: "center",
                        pointerEvents: "auto",
                    }}
                >
                    <IonBackdrop
                        visible={visible}
                        tappable={false}
                        className="opacity-60"
                    />
                    <IonSpinner
                        name="crescent"
                        color="primary"
                        style={{
                            position: "relative",
                            zIndex: 10000,
                            width: "48px",
                            height: "48px",
                        }}
                    />
                </div>
            )}
        </PageLoaderContext.Provider>
    );
}

export function usePageLoader(): PageLoaderContextValue {
    const context = useContext(PageLoaderContext);

    if (!context) {
        throw new Error(
            "usePageLoader must be used within a PageLoaderProvider",
        );
    }

    return context;
}
