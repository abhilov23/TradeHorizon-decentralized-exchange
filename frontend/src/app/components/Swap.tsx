"use client";

import { useState, useEffect, useCallback } from "react";
import { SUPPORTED_TOKENS, TokenDetails } from "../lib/tokens";
import { useTokens } from "../api/hooks/useToken";
import { PrimaryButton } from "./Button";
import axios from "axios";

interface SwapProps {
  publicKey: string;
}

export function Swap({ publicKey }: SwapProps) {
  const [baseAsset, setBaseAsset] = useState<TokenDetails>(SUPPORTED_TOKENS[0]);
  const [quoteAsset, setQuoteAsset] = useState<TokenDetails>(SUPPORTED_TOKENS[1]);
  const [baseAmount, setBaseAmount] = useState<string>("");
  const [quoteAmount, setQuoteAmount] = useState<string>("");
  const [isFetchingQuote, setIsFetchingQuote] = useState(false);

  const { loading, error, tokenBalances, refetch } = useTokens(publicKey);

  const getTokenBalance = useCallback((token: TokenDetails): number => {
    return tokenBalances?.tokens?.find((t) => t.mint === token.mint)?.balance || 0;
  }, [tokenBalances]);

  const getTokenPrice = useCallback((token: TokenDetails): number => {
    if (!tokenBalances?.tokens) return 0;
    const tokenWithPrice = tokenBalances.tokens.find((t) => t.mint === token.mint);
    return tokenWithPrice && tokenWithPrice.price !== "N/A"
      ? parseFloat(tokenWithPrice.price)
      : 0;
  }, [tokenBalances]);

  const getTokenUSDBalance = useCallback((token: TokenDetails): string => {
    const balance = getTokenBalance(token);
    const price = getTokenPrice(token);
    return (balance * price).toFixed(2) || "0.00";
  }, [getTokenBalance, getTokenPrice]);

  const fetchQuote = useCallback(async () => {
    const parsedBaseAmount = parseFloat(baseAmount);
    if (!baseAmount || isNaN(parsedBaseAmount) || parsedBaseAmount <= 0 || baseAsset.mint === quoteAsset.mint) {
      setQuoteAmount("");
      setIsFetchingQuote(false);
      return;
    }

    const controller = new AbortController();
    setIsFetchingQuote(true);

    try {
      const amountInSmallestUnit = Math.round(parsedBaseAmount * (10 ** baseAsset.decimals));
      const response = await axios.get(
        `https://quote-api.jup.ag/v6/quote?inputMint=${baseAsset.mint}&outputMint=${quoteAsset.mint}&amount=${amountInSmallestUnit}&slippageBps=50`,
        { signal: controller.signal }
      );
      
      const outputAmount = Number(response.data.outAmount) / (10 ** quoteAsset.decimals);
      setQuoteAmount(outputAmount.toFixed(Math.min(quoteAsset.decimals, 6)));
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error("Quote fetch failed:", err);
        setQuoteAmount("0");
      }
    } finally {
      setIsFetchingQuote(false);
    }

    return () => controller.abort();
  }, [baseAsset, quoteAsset, baseAmount]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const handleSwapAssets = () => {
    setBaseAsset(quoteAsset);
    setQuoteAsset(baseAsset);
    setBaseAmount(quoteAmount);
    setQuoteAmount("");
  };

  const handleSwap = async () => {
    const baseValue = parseFloat(baseAmount);
    if (!baseAmount || !quoteAmount || isNaN(baseValue) || baseValue <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }
    if (baseValue > getTokenBalance(baseAsset)) {
      alert(`Insufficient ${baseAsset.name} balance. Available: ${getTokenBalance(baseAsset)}`);
      return;
    }

    try {
      console.log("Swapping:", {
        from: { asset: baseAsset.name, amount: baseAmount },
        to: { asset: quoteAsset.name, amount: quoteAmount },
      });
      await refetch();
      setBaseAmount("");
      setQuoteAmount("");
      alert("Swap completed successfully!");
    } catch (error) {
      console.error("Swap failed:", error);
      alert("Swap failed. Check console for details.");
    }
  };

  return (
    <div className="p-12">
      <div className="text-2xl font-bold p-4">Swap Tokens</div>
      
      <SwapInputRow
        amount={baseAmount}
        onAmountChange={setBaseAmount}
        onSelect={(asset) => {
          if (asset.mint !== quoteAsset.mint) setBaseAsset(asset);
          else alert("Base and quote assets cannot be the same");
        }}
        selectedToken={baseAsset}
        title="You Pay:"
        balance={`${getTokenBalance(baseAsset)} ${baseAsset.name} ≈ $${getTokenUSDBalance(baseAsset)}`}
        topBorderEnabled={true}
        bottomBorderEnabled={false}
      />

      <div className="flex justify-center">
        <div
          onClick={handleSwapAssets}
          className="cursor-pointer rounded-full w-10 h-10 border absolute mt-[-20px] bg-white flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>
        </div>
      </div>

      <SwapInputRow
        amount={quoteAmount}
        onSelect={(asset) => {
          if (asset.mint !== baseAsset.mint) setQuoteAsset(asset);
          else alert("Base and quote assets cannot be the same");
        }}
        selectedToken={quoteAsset}
        title="You Receive:"
        balance={`${getTokenBalance(quoteAsset)} ${quoteAsset.name} ≈ $${getTokenUSDBalance(quoteAsset)}`}
        topBorderEnabled={false}
        bottomBorderEnabled={true}
        disabled
      />

      {loading && <p className="text-center text-gray-500">Loading balances...</p>}
      {isFetchingQuote && <p className="text-center text-gray-500">Fetching quote...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <div className="flex justify-end pt-4">
        <PrimaryButton
          onClick={handleSwap}
          disabled={loading || !baseAmount || !quoteAmount || isFetchingQuote || parseFloat(baseAmount) <= 0}
        >
          Swap
        </PrimaryButton>
      </div>
    </div>
  );
}

interface SwapInputRowProps {
  onSelect: (asset: TokenDetails) => void;
  amount?: string;
  onAmountChange: (value: string) => void;
  selectedToken: TokenDetails;
  title: string;
  balance: string;
  topBorderEnabled: boolean;
  bottomBorderEnabled: boolean;
  disabled?: boolean;
}

function SwapInputRow({
  onSelect,
  amount,
  onAmountChange,
  selectedToken,
  title,
  balance,
  topBorderEnabled,
  bottomBorderEnabled,
  disabled = false,
}: SwapInputRowProps) {
  return (
    <div
      className={`border flex justify-between items-center p-4 rounded-lg ${
        topBorderEnabled ? "rounded-t-xl" : ""
      } ${bottomBorderEnabled ? "rounded-b-xl" : ""}`}
    >
      <div className="gap-4 flex flex-col">
        <span className="text-gray-500 text-md capitalize p-2">{title}</span>
        <AssetSelector selectedToken={selectedToken} onSelect={onSelect} />
        <span className="text-sm text-gray-600 mt-2">Balance: {balance}</span>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => !disabled && onAmountChange(e.target.value)}
          className={`p-3 text-2xl outline-none border rounded-lg ${
            disabled ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
          placeholder="0"
          dir="rtl"
          value={amount || ""}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

interface AssetSelectorProps {
  selectedToken: TokenDetails;
  onSelect: (asset: TokenDetails) => void;
}

function AssetSelector({ selectedToken, onSelect }: AssetSelectorProps) {
  return (
    <div>
      <form className="flex flex-col space-y-2">
        <select
          id="tokenSelect"
          className="w-48 px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedToken.mint}
          onChange={(e) => {
            const selected = SUPPORTED_TOKENS.find((token) => token.mint === e.target.value);
            if (selected) onSelect(selected);
          }}
        >
          {SUPPORTED_TOKENS.map((token) => (
            <option key={token.mint} value={token.mint}>
              {token.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}