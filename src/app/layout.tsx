import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./theme-provider";
import { ReduxProviders } from "@/redux/provider";
import AuthContext from "./auth-provider";

export const metadata: Metadata = {
  title: "CNIT - Serviços de Transporte LTDA",
  description:
    "App da empresa CNIT focado em gerencia de transporte de alunos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProviders>
          <AuthContext>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </AuthContext>
        </ReduxProviders>
      </body>
    </html>
  );
}
