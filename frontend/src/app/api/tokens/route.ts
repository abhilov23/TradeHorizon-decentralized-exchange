import { NextRequest, NextResponse } from "next/server";
import { getAccount, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { connection, getSupportedTokens } from "@/app/lib/constants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
        return NextResponse.json({ error: "Address parameter is required" }, { status: 400 });
    }

    let publicKey: PublicKey;
    try {
        publicKey = new PublicKey(address);
    } catch (e) {
        console.error(`Invalid address provided: ${address}`, e);
        return NextResponse.json({ error: "Invalid Solana address" }, { status: 400 });
    }

    const supportedTokens = await getSupportedTokens();

    const balances = await Promise.all(
        supportedTokens.map(token =>
            getAccountBalance(token, publicKey).catch(error => {
                console.error(`Error fetching balance for ${token.name}:`, error);
                return 0; // Fallback to 0 on any error
            })
        )
    );

    return NextResponse.json({
        tokens: supportedTokens.map((token, index) => ({
            ...token,
            balance: balances[index],
        })),
    });
}

async function getAccountBalance(
    token: { name: string; mint: string; native: boolean },
    address: PublicKey
): Promise<number> {
    try {
        if (token.native) {
            const balance = await connection.getBalance(address);
            return balance / LAMPORTS_PER_SOL;
        }

        const ata = await getAssociatedTokenAddress(new PublicKey(token.mint), address);
        try {
            const account = await getAccount(connection, ata);
            const mint = await getMint(connection, new PublicKey(token.mint));
            return Number(account.amount) / 10 ** mint.decimals;
        } catch (error: any) {
            if (error.name === "TokenAccountNotFoundError" || error.message.includes("does not exist")) {
                return 0; // Account doesn’t exist, return 0
            }
            throw error; // Re-throw other errors
        }
    } catch (error) {
        console.error(`Failed to fetch balance for ${token.name} at ${address.toBase58()}:`, error);
        throw error; // Let Promise.all catch handle it
    }
}