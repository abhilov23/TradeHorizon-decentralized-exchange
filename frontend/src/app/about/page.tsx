export default function AboutPage() {
    return (
        <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-16 px-4 overflow-y-auto h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">About TradeHorizon</h1>
                
                <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">The Problem We're Solving</h2>
                        <p className="text-slate-600">
                            Centralized exchanges in India face numerous challenges including regulatory uncertainty, 
                            bank payment restrictions, and high fees. These issues have led to reduced accessibility 
                            and trust in crypto trading. TradeHorizon is building a decentralized solution that puts 
                            control back in users' hands through true peer-to-peer trading on the Solana blockchain.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-slate-50 rounded-lg">
                            <div className="text-blue-600 mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Self-Custody</h3>
                            <p className="text-slate-600">Your keys, your crypto - no need to trust centralized entities with your funds</p>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-lg">
                            <div className="text-blue-600 mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Borderless</h3>
                            <p className="text-slate-600">Trade without restrictions or dependence on traditional banking systems</p>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-lg">
                            <div className="text-blue-600 mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Cost-Effective</h3>
                            <p className="text-slate-600">Minimal fees compared to traditional exchanges in India</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Our Solution</h2>
                        <p className="text-slate-600 mb-4">
                            TradeHorizon leverages Solana's blockchain technology to provide a robust trading platform that addresses key issues in the Indian crypto market:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 space-y-2">
                            <li>Direct peer-to-peer trading without intermediaries</li>
                            <li>Non-custodial wallets for complete control over funds</li>
                            <li>Seamless INR to crypto conversions</li>
                            <li>Transparent and immutable transactions</li>
                            <li>Compliance with decentralized principles</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
