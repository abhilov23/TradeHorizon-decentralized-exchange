import { Geist } from "next/font/google";
import "./globals.css";
import Appbar from "./components/Appbar";
import { Providers } from "./components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <Providers>
        <Appbar/>
        {children}
        </Providers>
      </body>
    </html>
  );
}
