import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "./context/ResumeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ivy League Resume Generator",
  description: "Generate professional Ivy League style resumes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
