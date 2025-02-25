"use client";

import { useState, useEffect } from "react";
import { SUPPORTED_TOKENS, TokenDetails } from "../lib/tokens";
import { useTokens } from "../api/hooks/useToken"; // Adjust the path if necessary
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, Keypair } from "@solana/web3.js";
import { PrimaryButton } from "./Button";
import axios from "axios"; // For server API calls (optional, install with `npm install axios`)

interface WithdrawForm {
  token: TokenDetails;
  amount: string;
  destinationAddress: string;
}

export function Withdraw({ publicKey }: { publicKey: string }) {
  const [form, setForm] = useState<WithdrawForm>({
    token: SUPPORTED_TOKENS[0],
    amount: "",
    destinationAddress: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch token balances and prices using the useTokens hook
  const { loading, error: fetchError, tokenBalances } = useTokens(publicKey);

  // Solana connection for transactions
  const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

  // Get balance for a specific token (returns balance as a number or 0 if not found)
  const getTokenBalance = (token: TokenDetails): number => {
    if (!tokenBalances || !tokenBalances.tokens) return 0;
    const tokenBalance = tokenBalances.tokens.find((t) => t.mint === token.mint);
    return tokenBalance ? tokenBalance.balance : 0;
  };

  // Get price for a specific token (for USD calculation)
  const getTokenPrice = (token: TokenDetails): number => {
    if (!tokenBalances || !tokenBalances.tokens) return 0;
    const tokenWithPrice = tokenBalances.tokens.find((t) => t.mint === token.mint);
    return tokenWithPrice && tokenWithPrice.price !== "N/A"
      ? parseFloat(tokenWithPrice.price)
      : 0;
  };

  // Calculate USD balance for display
  const getTokenUSDBalance = (token: TokenDetails): string => {
    const balance = getTokenBalance(token);
    const price = getTokenPrice(token);
    return (balance * price).toFixed(2) || "0.00";
  };

  // Handle form changes
  const handleChange = (field: keyof WithdrawForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null); // Clear error on change
  };

  // Handle token selection
  const handleTokenSelect = (token: TokenDetails) => {
    setForm((prev) => ({ ...prev, token }));
    setError(null); // Clear error on token change
  };

  // Handle withdrawal (send request to server to create and sign transaction)
  const handleWithdraw = async () => {
    try {
      // Validate inputs
      if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) {
        setError("Please enter a valid positive amount.");
        return;
      }

      const balance = getTokenBalance(form.token);
      const amount = parseFloat(form.amount);

      if (amount > balance) {
        setError(`Insufficient balance for ${form.token.name}. Available: ${balance}`);
        return;
      }

      // Validate destination address
      try {
        new PublicKey(form.destinationAddress); // Check if it's a valid Solana address
      } catch (e) {
        setError("Invalid destination address. Please enter a valid Solana public key.");
        return;
      }

      // Send withdrawal request to server (securely handle private key on backend)
      const response = await axios.post("/api/withdraw", {
        sourcePublicKey: publicKey,
        destinationAddress: form.destinationAddress,
        tokenMint: form.token.mint,
        amount: amount,
        tokenIsNative: form.token.native,
      });

      if (response.data.success) {
        setSuccess(`Successfully withdrew ${amount} ${form.token.name} to ${form.destinationAddress}`);
        setForm({ ...form, amount: "", destinationAddress: "" }); // Reset form
      } else {
        setError(response.data.error || "Withdrawal failed.");
      }
    } catch (error) {
      console.error("Withdrawal failed:", error);
      setError(`Withdrawal failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Withdraw Tokens</h2>
      {loading && <p className="text-center text-gray-500">Loading balances...</p>}
      {fetchError && <p className="text-center text-red-500">Error: {fetchError}</p>}
      {!loading && !fetchError && (
        <>
          <div className="space-y-4">
            {/* Token Selector */}
            <div>
              <label className="block text-gray-700 mb-2">Token to Withdraw</label>
              <select
                value={form.token.mint}
                onChange={(e) => {
                  const selectedToken = SUPPORTED_TOKENS.find((t) => t.mint === e.target.value);
                  if (selectedToken) handleTokenSelect(selectedToken);
                }}
                className="w-full px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {SUPPORTED_TOKENS.map((token) => (
                  <option key={token.mint} value={token.mint}>
                    {token.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder={`Max: ${getTokenBalance(form.token)}`}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.000001" // Allow fine-grained amounts for SOL/SPL tokens
                min="0"
              />
            </div>

            {/* Destination Address Input */}
            <div>
              <label className="block text-gray-700 mb-2">Destination Address</label>
              <input
                type="text"
                value={form.destinationAddress}
                onChange={(e) => handleChange("destinationAddress", e.target.value)}
                placeholder="Enter Solana public key"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Balance Display */}
            <p className="text-sm text-gray-600 mt-2">
              Current Balance: {getTokenBalance(form.token)} {form.token.name} ≈ ${getTokenUSDBalance(form.token)}
            </p>

            {/* Error/Success Messages */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

            {/* Withdraw Button */}
            <PrimaryButton
              onClick={handleWithdraw}
              disabled={loading || !form.amount || !form.destinationAddress || parseFloat(form.amount) <= 0}
              className="w-full"
            >
              Withdraw
            </PrimaryButton>
          </div>
        </>
      )}
    </div>
  );
}