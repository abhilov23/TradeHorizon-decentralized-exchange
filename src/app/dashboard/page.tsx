
import { getServerSession } from "next-auth";
import { ProfileCard } from "../components/ProfileCard";
import db from "@/app/db";
import { authConfig } from "@/app/lib/auth";

async function getUserWallet() {
    const session = await getServerSession(authConfig);

    const userWallet = await db.solWallet.findFirst({ // Added await to ensure the promise resolves
        where: {
            userId: session?.user?.uid,
        },
        select: {
            publicKey: true,
        }
    });

    if (!userWallet) {
        return {
            error: "No Solana wallet found associated with the user" // Fixed typo in "associated"
        };
    }

    return { error: null, userWallet };
}

export default async function DashboardPage() {
    const userWallet = await getUserWallet();

    if (userWallet.error || !userWallet.userWallet?.publicKey) {
        return <div>
            No Solana Wallet Found
        </div>;
    }

    return <div>
        <ProfileCard publicKey={userWallet.userWallet.publicKey} /> {/* Removed optional chaining since userWallet is guaranteed to exist */}
    </div>;
}