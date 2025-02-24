import { TokenDetails } from "@/app/lib/constants";
import axios from "axios";
import { useState, useEffect } from "react";

// Extend TokenDetails with balance and usdBalance
interface TokenWithBalance extends TokenDetails {
  balance: number; // Match API response type
  usdBalance: string; // Computed as string for display
}

// Shape of the API response (based on your sample data)
interface TokenBalanceResponse {
  tokens: TokenWithBalance[];
}

export function useTokens(address: string) {
  const [tokenBalances, setTokenBalances] = useState<{
    totalBalance: number;
    tokens: TokenWithBalance[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip if no address is provided
    if (!address) {
      setError("No address provided");
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    axios
      .get(`/api/tokens?address=${encodeURIComponent(address)}`)
      .then((res) => {
        if (!isMounted) return; // Prevent state update if unmounted

        const tokens: TokenWithBalance[] = res.data.tokens.map((token: TokenDetails & { balance: number }) => {
          const balance = token.balance;
          const price = parseFloat(token.price === "N/A" ? "0" : token.price);
          const usdBalance = (balance * price).toFixed(2); // Compute USD value
          return { ...token, balance, usdBalance };
        });

        const totalBalance = tokens.reduce((sum, token) => {
          return sum + parseFloat(token.usdBalance);
        }, 0);

        setTokenBalances({ totalBalance, tokens });
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.response?.data?.error || "Failed to fetch token balances");
        setLoading(false);
      });

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [address]); // Depend on address to refetch when it changes

  return { loading, tokenBalances };
}