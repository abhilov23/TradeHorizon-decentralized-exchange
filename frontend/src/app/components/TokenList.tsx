import { TokenWithBalance } from "../api/hooks/useToken"


export function TokenList({tokens}: {
    tokens: TokenWithBalance[]
}) {
    return <div>
        {tokens.map(t => <TokenRow key={t.name} token={t} />)}
    </div>
}

function TokenRow({token}: {
    token: TokenWithBalance
}) {
    return <div className="flex justify-between items-center p-4 hover:bg-slate-100 rounded-lg transition-colors">
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <img src={token.image} className="h-12 w-12 rounded-full mr-4" alt={token.name} />
            </div>
            <div>
                <div className="font-bold text-lg text-gray-900">
                    {token.name}
                </div>
                <div className="text-sm text-gray-500">
                    1 {token.name} = ${token.price}
                </div>
            </div>
        </div>
        <div className="text-right">
            <div className="font-bold text-lg text-gray-900">
                ${token.usdBalance}
            </div>
            <div className="text-sm text-gray-500">
                {token.balance.toFixed(4)} {token.name}
            </div>
        </div>
    </div>
}