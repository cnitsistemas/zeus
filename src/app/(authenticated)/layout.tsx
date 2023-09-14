"use client";
import "@/app/globals.css";
import { ReduxProviders } from "@/store/provider";
import { PersistGate } from "redux-persist/integration/react";
import { persist } from "@/store";
import ThemeRegistry from "../ThemeRegistry";
import DashboardLayout from "@/layout/Dashbord";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProviders>
          <PersistGate loading={null} persistor={persist}>
            <ThemeRegistry options={{ key: "mui" }}>
              <ReactNotifications />
              <DashboardLayout>{children}</DashboardLayout>
            </ThemeRegistry>
          </PersistGate>
        </ReduxProviders>
      </body>
    </html>
  );
}
