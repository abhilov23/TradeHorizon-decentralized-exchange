// pages/api/withdraw.ts (or app/api/withdraw/route.ts in App Router)
import { NextApiRequest, NextApiResponse } from "next";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, Keypair, sendAndConfirmTransaction } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sourcePublicKey, destinationAddress, tokenMint, amount, tokenIsNative } = req.body;

  try {
    // Fetch user's private key securely (e.g., from database, encrypted)
    const userPrivateKey = Buffer.from("your-secure-private-key-base64-here", "base64"); // Example, replace with real storage
    const keypair = Keypair.fromSecretKey(userPrivateKey);

    const sourceKey = new PublicKey(sourcePublicKey);
    const destinationKey = new PublicKey(destinationAddress);

    if (tokenIsNative) {
      // Withdraw SOL
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: sourceKey,
          toPubkey: destinationKey,
          lamports: Math.floor(amount * LAMPORTS_PER_SOL),
        })
      );
      transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      transaction.feePayer = sourceKey;

      // Sign and send transaction
      const signature = await sendAndConfirmTransaction(connection, transaction, [keypair]);
      return res.json({ success: true, signature });
    } else {
      // Withdraw SPL token
      const token = new Token(connection, new PublicKey(tokenMint), TOKEN_PROGRAM_ID, keypair);
      const sourceTokenAccount = await token.getOrCreateAssociatedAccountInfo(sourceKey);
      const destinationTokenAccount = await token.getOrCreateAssociatedAccountInfo(destinationKey);

      const transaction = new Transaction().add(
        token.createTransferInstruction(
          sourceTokenAccount.address,
          destinationTokenAccount.address,
          sourceKey,
          Math.floor(amount * 10 ** token.decimals) // Adjust for token decimals
        )
      );
      transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      transaction.feePayer = sourceKey;

      // Sign and send transaction
      const signature = await sendAndConfirmTransaction(connection, transaction, [keypair]);
      return res.json({ success: true, signature });
    }
  } catch (error) {
    console.error("Withdrawal error:", error);
    return res.status(500).json({ error: "Failed to process withdrawal" });
  }
}