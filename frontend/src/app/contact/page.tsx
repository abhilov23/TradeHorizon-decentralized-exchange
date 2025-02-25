export default function ContactPage() {
    return (
        <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-16 px-4 overflow-y-auto h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
                
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                        <p className="text-slate-600 mb-8">
                            Have questions about our DEX? We&apos;re here to help! Reach out to us through any of the channels below.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <a href="mailto:abhilov01@gmail.com" className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <svg className="w-8 h-8 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <div className="font-semibold text-slate-800">Email</div>
                                    <span className="text-slate-600">abhilov01@gmail.com</span>
                                </div>
                            </a>
                            <a href="https://x.com/Abhilov_Gupta_" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <svg className="w-8 h-8 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                <div>
                                    <div className="font-semibold text-slate-800">Twitter</div>
                                    <span className="text-slate-600">@Abhilov_Gupta_</span>
                                </div>
                            </a>
                            <a href="https://github.com/abhilov23" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <svg className="w-8 h-8 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                <div>
                                    <div className="font-semibold text-slate-800">GitHub</div>
                                    <span className="text-slate-600">@Abhilov23</span>
                                </div>
                            </a>
                            <a href="https://www.linkedin.com/in/abhilov-gupta-2852191b9/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <svg className="w-8 h-8 text-blue-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <div className="font-semibold text-slate-800">LinkedIn</div>
                                    <span className="text-slate-600">Abhilov Gupta</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
