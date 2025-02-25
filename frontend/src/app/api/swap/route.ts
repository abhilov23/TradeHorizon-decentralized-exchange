import { authConfig } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { Connection, Keypair, VersionedTransaction, PublicKey } from "@solana/web3.js";

export async function POST(req: NextRequest) {
  const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=5935eb6e-9c4e-4031-b4b6-f1290106d2d6");

  try {
    const data: { quoteResponse: any } = await req.json();
    console.log("Received data:", data);

    if (!data.quoteResponse) {
      return NextResponse.json(
        { message: "Missing quoteResponse in request body" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authConfig);
    console.log("Session:", session);
    if (!session?.user) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 }
      );
    }

    const solWallet = await db.solWallet.findFirst({
      where: { userId: session.user.uid },
    });
    if (!solWallet) {
      return NextResponse.json(
        { message: "Couldn’t find associated Solana wallet" },
        { status: 401 }
      );
    }

    // Check SOL balance
    const solBalance = await connection.getBalance(new PublicKey(solWallet.publicKey));
    console.log("SOL balance (lamports):", solBalance, "SOL:", solBalance / 1e9);
    if (solBalance < 5000) { // ~0.000005 SOL for fees
      return NextResponse.json(
        { message: "Insufficient SOL balance for transaction fees" },
        { status: 400 }
      );
    }

    // Check token balance (assuming inputMint from quoteResponse)
    const tokenMint = data.quoteResponse.inputMint;
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(solWallet.publicKey),
      { mint: new PublicKey(tokenMint) }
    );
    const tokenBalance = tokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount || 0;
    const amountInSmallestUnit = Number(data.quoteResponse.inAmount);
    console.log("Token balance:", tokenBalance, "Required:", amountInSmallestUnit / (10 ** data.quoteResponse.inputDecimals));
    if (tokenBalance * (10 ** data.quoteResponse.inputDecimals) < amountInSmallestUnit) {
      return NextResponse.json(
        { message: "Insufficient input token balance" },
        { status: 400 }
      );
    }

    const swapResponse = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteResponse: data.quoteResponse,
        userPublicKey: solWallet.publicKey,
        wrapAndUnwrapSol: true,
      }),
    });

    const swapData = await swapResponse.json();
    console.log("Jupiter swap response:", swapData);

    if (!swapResponse.ok || !swapData.swapTransaction) {
      throw new Error(`Jupiter swap failed: ${swapData.error || "No swapTransaction returned"}`);
    }

    const { swapTransaction } = swapData;
    const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
    const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
    const privateKey = getPrivateKeyFromDb(solWallet.privateKey);
    transaction.sign([privateKey]);

    const latestBlockHash = await connection.getLatestBlockhash();
    const rawTransaction = transaction.serialize();
    const txid = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      maxRetries: 2,
    });
    console.log("Transaction sent:", txid);

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txid,
    });

    return NextResponse.json({ txid });
  } catch (error: any) {
    console.error("Error in /api/swap:", error.message, error.stack);
    return NextResponse.json(
      { message: "Failed to process swap", error: error.message },
      { status: 500 }
    );
  }
}

function getPrivateKeyFromDb(privateKey: string) {
  try {
    const arr = privateKey.split(",").map((x) => Number(x));
    const privateKeyUintArr = Uint8Array.from(arr);
    if (privateKeyUintArr.length !== 64) {
      throw new Error("Invalid private key length");
    }
    return Keypair.fromSecretKey(privateKeyUintArr);
  } catch (error) {
    throw new Error(`Failed to parse private key: ${error.message}`);
  }
}