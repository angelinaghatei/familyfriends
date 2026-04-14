import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "FamilyFriends",
  description: "Dog breed browser app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body className="min-h-screen bg-[#e0e0e0] flex justify-center">
        {children}
      </body>
    </html>
  );
}
