import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@/components/ThirdwebProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "F0RGE",
  description: "Launchpad for Mode blockchain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider
          activeChain="ethereum"
          clientId="13f67df54a3a7c396e1167c2d49cd99f"
          s
        >
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
