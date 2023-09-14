"use client"
import { ReduxProviders } from "@/store/provider";
import { PersistGate } from "redux-persist/integration/react";
import { persist } from "@/store";
import { Providers } from "../theme-provider";
import ThemeRegistry from "../ThemeRegistry";

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
            <ThemeRegistry options={{ key: 'mui' }}>
              {children}
            </ThemeRegistry>
          </PersistGate>
        </ReduxProviders>
      </body>
    </html>
  );
}