import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./Authorization/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Red Rose",
  description: "An Proper Learning Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
