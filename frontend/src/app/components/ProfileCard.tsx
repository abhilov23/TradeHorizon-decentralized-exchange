"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton, TabButton } from "./Button";
import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { TokenWithBalance, useTokens } from "../api/hooks/useToken";
import { TokenList } from "./TokenList";
import { Swap } from "./Swap";
import { AddBalance } from "./AddBalance";
import { Withdraw } from "./Withdraw"; // Import the Withdraw component

type Tab = "tokens" | "add_funds" | "swap" | "withdraw";
const tabs: { id: Tab; name: string }[] = [
  { id: "tokens", name: "Tokens" },
  { id: "add_funds", name: "Add Funds" },
  { id: "swap", name: "Swap" },
  { id: "withdraw", name: "Withdraw" },
];

export const ProfileCard = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<Tab>("tokens");
  const [copied, setCopied] = useState(false);

  const { tokenBalances, loading } = useTokens(publicKey);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  if (session.status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
        <span className="ml-4 text-lg font-semibold">Loading, please wait...</span>
      </div>
    );
  }

  if (!session.data?.user) {
    router.push("/");
    return null;
  }

  return (
    <div className="pt-8 flex justify-center">
      <div className="max-w-4xl bg-white rounded shadow w-full">
        <Greeting
          image={session.data?.user?.image ?? ""}
          name={session.data?.user?.name?.split(" ")[0] ?? ""}
        />

        <div className="text-slate-500 px-10 pb-6">
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="text-5xl font-bold text-black">
                ${tokenBalances?.totalBalance.toFixed(2)}
              </div>
              <div className="font-slate-500 font-bold text-3xl flex flex-col justify-end pb-0 pl-2">
                USD
              </div>
            </div>

            <div>
              <PrimaryButton
                onClick={() => {
                  navigator.clipboard.writeText(publicKey);
                  setCopied(true);
                }}
              >
                {copied ? "Copied" : "Copy Wallet Address"}
              </PrimaryButton>
            </div>
          </div>
        </div>

        <div className="w-full flex px-10">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={tab.id === selectedTab}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.name}
            </TabButton>
          ))}
        </div>

        <div className={`${selectedTab === "tokens" ? "visible" : "hidden"}`}>
          <div className="pt-4 bg-slate-50 p-12">
            <TokenList tokens={tokenBalances?.tokens || []} />
          </div>
        </div>
        <div className={`${selectedTab === "swap" ? "visible" : "hidden"}`}>
          <div className="pt-4 bg-slate-50 p-12">
            <Swap publicKey={publicKey} />
          </div>
        </div>
        <div className={`${selectedTab === "add_funds" ? "visible" : "hidden"}`}>
          <div className="pt-4 bg-slate-50 p-12">
            <AddBalance publicKey={publicKey} />
          </div>
        </div>
        <div className={`${selectedTab === "withdraw" ? "visible" : "hidden"}`}>
          <div className="pt-4 bg-slate-50 p-12">
            <Withdraw publicKey={publicKey} />
          </div>
        </div>
      </div>
    </div>
  );
};

function Greeting({ image, name }: { image: string; name: string }) {
  return (
    <div className="flex p-12">
      <img src={image} className="rounded-full w-16 h-16 mr-4" />
      <div className="text-2xl font-semibold flex flex-col justify-center">
        Welcome back, {name}
      </div>
    </div>
  );
}