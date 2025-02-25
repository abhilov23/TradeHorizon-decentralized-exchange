"use client";

import { QRCodeCanvas } from "qrcode.react";

interface AddBalanceProps {
  publicKey: string; // User’s wallet public key from session/db
}

export function AddBalance({ publicKey }: AddBalanceProps) {
  // Sample minimum SOL amount for transactions (adjust based on your needs)
  const MIN_SOL_AMOUNT = 0.1; // Example: 0.1 SOL for transaction fees and basic swaps

  return (
    <div className="p-4 text-center">
      <div className="flex justify-center mb-4">
        <QRCodeCanvas value={publicKey} size={128} />
      </div>
      <p className="text-gray-700 break-all">
        Wallet Address: <span className="font-mono">{publicKey}</span>
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Scan the QR code or copy the address to send SOL or tokens to fund your wallet.
      </p>
      <p className="text-sm text-blue-600 mt-4 font-medium">
        Note: Please add at least <span className="font-bold">{MIN_SOL_AMOUNT} SOL</span> to perform transactions (e.g., swaps) on TradeHorizon. This covers transaction fees and ensures liquidity for your swaps.
      </p>
    </div>
  );
}