"use client"
import "@/app/globals.css";
import type { Metadata } from "next";
import { ReduxProviders } from "@/redux/provider";
import { ThemeProvider } from "@/app/theme-provider";
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
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <DashbordLayout>
                {children}
              </DashbordLayout>
            </ThemeProvider>
          </PersistGate>
        </ReduxProviders>
      </body>
    </html>
  );
}