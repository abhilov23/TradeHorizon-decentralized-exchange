# TradeHorizon - Solana Decentralized Exchange (DEX)

Welcome to TradeHorizon, a decentralized exchange (DEX) built on the Solana blockchain. TradeHorizon leverages Solana’s fast and low-cost transactions, integrated with Jupiter’s aggregator for optimal token swaps, to provide users with a secure, user-friendly platform for trading Solana-based tokens (e.g., SOL, USDC, USDT, BTC, SRM). This project includes features for token swapping, wallet management, balance management (add funds, withdraw), and user profiles, all wrapped in a modern Next.js frontend with Tailwind CSS for styling.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Security and Bug Bounty](#security-and-bug-bounty)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview
TradeHorizon is designed to facilitate seamless token swaps on Solana, managing user wallets securely with stored public/private keys (server-side) for transactions. The frontend is built with Next.js, using Tailwind CSS for a responsive, modern UI. It integrates with Solana’s Web3.js library for blockchain interactions, Jupiter’s API for price aggregation, and NextAuth.js for user authentication.

This project is ideal for developers, security researchers, and blockchain enthusiasts interested in building or studying Solana-based DEXs, with a focus on security (e.g., bug bounties for exposed keys) and user experience.

---

## Features
- **Token Swapping**: Swap between Solana native (SOL) and SPL tokens (e.g., USDC, USDT, BTC, SRM) using Jupiter’s aggregator for optimal pricing and liquidity.
- **Wallet Management**: Manage user wallets with a stored public/private keypair, enabling transactions without requiring a browser wallet extension.
- **Profile Dashboard**: View user profile, token balances, and total USD value, with options to add funds (via QR code) or withdraw tokens.
- **Add Funds**: Generate a QR code and wallet address for users to fund their Solana wallet with SOL or tokens.
- **Withdraw Funds**: Withdraw SOL or SPL tokens to a user-specified Solana address, handled securely server-side.
- **Security Research**: Includes tools and guidance for security students to study exposed Solana keys (e.g., using regex, Shodan, Google Dorks) for bug bounties and ethical hacking.
- **Responsive UI**: Built with Tailwind CSS for a clean, mobile-friendly design.

---

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git** (for cloning the repository)
- **Solana CLI** (optional, for local testing)
- **API Keys** (for Jupiter and Solana RPC, if needed)

Required dependencies:
- `@solana/web3.js`
- `@solana/spl-token`
- `next`
- `next-auth`
- `react`
- `react-dom`
- `axios`
- `qrcode.react`
- `gsap` (optional, for animations)
- `lodash` (for debouncing)

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/abhilov23/TradeHorizon-decentralized-exchange.git
   cd tradehorizon
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Configure environment variables:
   - Create a `.env.local` file in the root directory and set up necessary API keys and configurations.

4. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

---

## Usage
- **Swapping Tokens**: Select tokens and input the desired amount to swap via Jupiter’s aggregator.
- **Managing Wallets**: View balances, deposit funds using QR codes, and withdraw tokens securely.
- **User Authentication**: Sign in with email or wallet using NextAuth.js.

---

## Project Structure
```
tradehorizon/
├── components/        # Reusable UI components
├── pages/             # Next.js pages
├── utils/             # Helper functions and API integrations
├── styles/            # Tailwind CSS styles
├── public/            # Static assets
├── .env.local         # Environment variables
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

---

## Security and Bug Bounty
TradeHorizon prioritizes security. If you find vulnerabilities, follow responsible disclosure practices.

- **Report Bugs**: Submit security issues via GitHub Issues.
- **Bug Bounty**: Rewards for critical vulnerabilities affecting funds.
- **Security Tools**: Regex patterns, Shodan, and Google Dorks for key exposure analysis.

---

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Make changes and test thoroughly.
4. Submit a pull request.

---

## License
This project is licensed under the MIT License.

---

## Contact
For questions or collaborations, reach out via GitHub or email at `abhilovgupta01@gmail.com`.

