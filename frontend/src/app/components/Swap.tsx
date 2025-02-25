"use client";

import { useState, useEffect } from "react";
import { SUPPORTED_TOKENS, TokenDetails } from "../lib/tokens";
import { useTokens } from "../api/hooks/useToken"; // Adjust the path if necessary

export function Swap({ publicKey }: { publicKey: string }) {
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
  const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1]);

  // Fetch token balances and prices using the useTokens hook
  const { loading, error, tokenBalances } = useTokens(publicKey);

  // Get balance for a specific token (returns balance as a string or "0" if not found)
  const getTokenBalance = (token: TokenDetails): string => {
    if (!tokenBalances || !tokenBalances.tokens) return "0";
    const tokenBalance = tokenBalances.tokens.find((t) => t.mint === token.mint);
    return tokenBalance ? tokenBalance.balance.toString() : "0";
  };

  // Get price for a specific token (for USD calculation)
  const getTokenPrice = (token: TokenDetails): number => {
    if (!tokenBalances || !tokenBalances.tokens) return 0;
    const tokenWithPrice = tokenBalances.tokens.find((t) => t.mint === token.mint);
    return tokenWithPrice && tokenWithPrice.price !== "N/A"
      ? parseFloat(tokenWithPrice.price)
      : 0;
  };

  // Calculate USD balance for display (optional, for richer UX)
  const getTokenUSDBalance = (token: TokenDetails): string => {
    const balance = parseFloat(getTokenBalance(token)) || 0;
    const price = getTokenPrice(token);
    return (balance * price).toFixed(2) || "0.00";
  };

  return (
    <div className="p-12">
      <div className="text-2xl font-bold p-4">Swap Tokens</div>
      <SwapInputRow
        onSelect={(asset) => setBaseAsset(asset)}
        selectedToken={baseAsset}
        title={`You Pay:`}
        balance={`${getTokenBalance(baseAsset)} ${baseAsset.name} ≈ $${getTokenUSDBalance(baseAsset)}`}
        topBorderEnabled={true}
        bottomBorderEnabled={false}
      />
      <div className="flex justify-center">
        <div
          onClick={() => {
            setBaseAsset(quoteAsset);
            setQuoteAsset(baseAsset);
          }}
          className="cursor-pointer rounded-full w-10 h-10 border absolute mt-[-20] bg-white flex items-center justify-center"
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
        onSelect={(asset) => setQuoteAsset(asset)}
        selectedToken={quoteAsset}
        title={`You Receive: `}
        balance={undefined} // Remove balance for "You Receive"
        topBorderEnabled={false}
        bottomBorderEnabled={true}
      />
      {loading && <p className="text-center text-gray-500">Loading balances...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
    </div>
  );
}

function SwapInputRow({
  onSelect,
  selectedToken,
  title,
  balance,
  subtitle,
  topBorderEnabled,
  bottomBorderEnabled,
}: {
  onSelect: (asset: TokenDetails) => void;
  selectedToken: TokenDetails;
  title: string;
  balance?: string; // Made optional to handle cases where balance is undefined
  subtitle?: string;
  topBorderEnabled: boolean;
  bottomBorderEnabled: boolean;
}) {
  return (
    <div
      className={`border flex flex-col justify-between p-4 rounded-lg ${
        topBorderEnabled ? "rounded-t-xl" : ""
      } ${bottomBorderEnabled ? "rounded-b-xl" : ""}`}
    >
      <div className="gap-4">
        <span className="text-gray-500 text-md capitalize p-2">{title}</span>
        <AssetSelector selectedToken={selectedToken} onSelect={onSelect} />
        {subtitle}
        {balance && <span className="text-sm text-gray-600 mt-2">Balance: {balance}</span>} {/* Only show balance if provided */}
      </div>
    </div>
  );
}

function AssetSelector({
  selectedToken,
  onSelect,
}: {
  selectedToken: TokenDetails;
  onSelect: (asset: TokenDetails) => void;
}) {
  return (
    <div>
      <form className="flex flex-col space-y-2">
        <select
          id="tokenSelect"
          className="w-48 px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedToken.mint}
          onChange={(e) => {
            const selectedToken = SUPPORTED_TOKENS.find(
              (token) => token.mint === e.target.value
            );
            if (selectedToken) {
              onSelect(selectedToken);
              console.log(selectedToken);
              alert(JSON.stringify(selectedToken));
            }
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