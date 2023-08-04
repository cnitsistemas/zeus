"use client"
import type { Metadata } from "next";
import { ReduxProviders } from "@/redux/provider";
import { Providers } from "@/app/theme-provider";
import { PersistGate } from "redux-persist/integration/react";
import { persist } from "@/redux/store";
import DashbordLayout from "@/theme/dashbord";

export const metadata: Metadata = {
  title: "CNIT - Serviços de Transporte LTDA",
  description:
    "App da empresa CNIT focado em gerencia de transporte de alunos.",
};

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
            <Providers>
              <DashbordLayout>
                {children}
              </DashbordLayout>
            </Providers>
          </PersistGate>
        </ReduxProviders>
      </body>
    </html >
  );
}