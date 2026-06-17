import type { Metadata } from "next";
import "./globals.css";
import { ResumeProvider } from "./context/ResumeContext";

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
      <body style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
