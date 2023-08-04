"use client"
import type { Metadata } from "next";
import { ReduxProviders } from "@/redux/provider";
import { PersistGate } from "redux-persist/integration/react";
import { persist } from "@/redux/store";
import { Providers } from "../theme-provider";

export const metadata: Metadata = {
  title: "CNIT - Serviços de Transporte LTDA",
  description:
    "App da empresa CNIT focado em gerencia de transporte de alunos.",
};

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