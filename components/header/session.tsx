"use client"
import { SessionProvider } from 'next-auth/react';
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const Session = ({ children, session }: any) => (
<>
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </PersistGate>
    </Provider>
</>
);

export default Session;
