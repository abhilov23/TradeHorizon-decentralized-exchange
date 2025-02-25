// Type definitions for better safety
export interface TokenDetails {
    name: string;
    mint: string;
    native: boolean;
    image: string;
    decimals: number;
}

// List of supported tokens
export const SUPPORTED_TOKENS: TokenDetails[] = [
    {
        name: "USDC",
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        native: false,
        image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
        decimals: 6, // Corrected from 9 to 6
    },
    {
        name: "USDT",
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        native: false,
        image: "https://cryptologos.cc/logos/tether-usdt-logo.png",
        decimals: 6, // Corrected from 9 to 6
    },
    {
        name: "BTC",
        mint: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
        native: false,
        image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        decimals: 6, // Corrected from 8 to 6
    },
    {
        name: "SOL",
        mint: "So11111111111111111111111111111111111111112",
        native: true,
        image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
        decimals: 9, // Correct as is
    },
    {
        name: "SRM",
        mint: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
        native: true,
        image: "https://cryptologos.cc/logos/serum-srm-logo.png",
        decimals: 6, // Correct as is
    }
];