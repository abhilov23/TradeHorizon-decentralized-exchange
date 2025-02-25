
import { Connection } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_TOKENS } from "./tokens";
import { TokenDetails } from './tokens';

interface PriceData {
    price: string;
}

// Global state
let LAST_UPDATED: number | null = null;
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000; // 1 minute
const prices: { [mint: string]: { price: string } } = {};


// Solana connection
export const connection = new Connection("https://api.mainnet-beta.solana.com");

// Fetch and return supported tokens with prices
export async function getSupportedTokens(): Promise<(TokenDetails & { price: string })[]> {
    // Refresh prices if needed
    if (!LAST_UPDATED || Date.now() - LAST_UPDATED >= TOKEN_PRICE_REFRESH_INTERVAL) {
        try {
            // Use mint addresses for the API call
            const mintIds = SUPPORTED_TOKENS.map(token => token.mint).join(",");
            const response = await axios.get(`https://api.jup.ag/price/v2?ids=${mintIds}`);
            const tokenData: { [mint: string]: PriceData } = response.data.data;

            // Validate and update prices
            if (tokenData && typeof tokenData === "object") {
                LAST_UPDATED = Date.now();
                Object.entries(tokenData).forEach(([mint, data]) => {
                    prices[mint] = { price: data.price };
                });
            } else {
                console.error("Unexpected response format from Jupiter API:", tokenData);
            }
        } catch (error: any) {
            console.error("Failed to fetch token prices from Jupiter API:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
        }
    }

    // Map tokens with their prices
    return SUPPORTED_TOKENS.map(token => ({
        ...token,
        price: prices[token.mint]?.price || "N/A"
    }));
}

// Example usage (uncomment to test)
// getSupportedTokens().then(tokens => console.log(tokens)).catch(console.error);