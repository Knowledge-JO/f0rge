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
          activeChain={{
            // === Required information for connecting to the network === \\
            chainId: 201022, // Chain ID of the network
            // Array of RPC URLs to use
            rpc: ["https://fsc-dataseed1.fonscan.io"],
    
            // === Information for adding the network to your wallet (how it will appear for first time users) === \\
            // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
            nativeCurrency: {
              decimals: 18,
              name: " FON",
              symbol: "FON",
            },
            shortName: "FON", // Display value shown in the wallet UI
            slug: "FON", // Display value shown in the wallet UI
            testnet: false, // Boolean indicating whether the chain is a testnet or mainnet
            chain: "FON", // Name of the network
            name: "FONSmartchain", // Name of the network
          }}
          clientId="13f67df54a3a7c396e1167c2d49cd99f"
          s
        >
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
