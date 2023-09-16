"use client";
import { ReduxProviders } from "@/store/provider";
import { PersistGate } from "redux-persist/integration/react";
import { persist } from "@/store";
import ThemeRegistry from "../ThemeRegistry";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

export default function NoAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProviders>
          <PersistGate loading={null} persistor={persist}>
            <ThemeRegistry options={{ key: "mui" }}>
              <ReactNotifications />
              {children}
            </ThemeRegistry>
          </PersistGate>
        </ReduxProviders>
      </body>
    </html>
  );
}
