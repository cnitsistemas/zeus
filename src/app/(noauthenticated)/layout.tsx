"use client"
import { ReduxProviders } from "@/store/provider";
import { PersistGate } from "redux-persist/integration/react";
import { persist } from "@/store";
import { Providers } from "../theme-provider";

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
            <Providers>
              {children}
            </Providers>
          </PersistGate>
        </ReduxProviders>
      </body>
    </html>
  );
}