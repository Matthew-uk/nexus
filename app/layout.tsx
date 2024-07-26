import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Provider from "@/utils/provider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins(
    {
      subsets: ["latin"],
      style: ["normal", "italic"],
      weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      variable: "--font-poppins",
    }
)

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable}`}>
          <Provider>
              {children}
          </Provider>
      </body>
    </html>
  );
}
