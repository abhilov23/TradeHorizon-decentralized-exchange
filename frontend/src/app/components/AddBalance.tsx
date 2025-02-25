"use client";

import { QRCodeCanvas } from "qrcode.react";

interface AddBalanceProps {
  publicKey: string; // User’s wallet public key from session/db
}

export function AddBalance({ publicKey }: AddBalanceProps) {
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
    </div>
  );
}