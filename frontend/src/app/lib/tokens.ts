
// Type definitions for better safety
export interface TokenDetails {
    name: string;
    mint: string;
    native: boolean;
    image: string; // Added image property
    decimals: number;
}

// List of supported tokens
export const SUPPORTED_TOKENS: TokenDetails[] = [
    {
        name: "USDC",
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        native: false,
        image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", // Added image URL
        decimals: 9,
    },
    {
        name: "USDT",
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        native: false,
        image: "https://cryptologos.cc/logos/tether-usdt-logo.png", // Added image URL
        decimals: 6
    },
    {
        name: "BTC",
        mint: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
        native: false,
        image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", // Added image URL
        decimals: 8     // Added typical BTC decimal value
    },
    {
        name: "SOL",
        mint: "So11111111111111111111111111111111111111112",
        native: true,
        image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png", // Added image URL
        decimals: 9     // Added typical SOL decimal value
    },
    {
        name: "SRM",
        mint: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
        native: true,
        image: "https://cryptologos.cc/logos/serum-srm-logo.png", // Added image URL
        decimals: 6     // Added typical SRM decimal value
    }
]