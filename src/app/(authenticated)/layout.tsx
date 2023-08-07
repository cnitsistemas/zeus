"use client";
import "@/app/globals.css";
import type { Metadata } from "next";
import { ReduxProviders } from "@/redux/provider";
import { Providers } from "@/app/theme-provider";
import { PersistGate } from "redux-persist/integration/react";
import { persist } from "@/redux/store";
import DashbordLayout from "@/theme/dashbord";
import { Roboto } from 'next/font/google'

export const metadata: Metadata = {
  title: "CNIT - Serviços de Transporte LTDA",
  description:
    "App da empresa CNIT focado em gerencia de transporte de alunos.",
};

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
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