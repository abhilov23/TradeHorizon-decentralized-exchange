"use client";
import { signIn } from "next-auth/react";
import { SecondaryButton } from "./Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function HeroPage() {
  const session = useSession();
   const router = useRouter();

    return (
        <section className="flex flex-col items-center justify-center text-center h-screen py-20 px-6 bg-gray-50 z-10 relative">
        {/* Hero Heading */}
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
          The Indian Cryptocurrency{" "}
          <span className="text-blue-500">Revolution</span>
        </h1>
  
        {/* Hero Subtitle */}
        <p className="text-xl text-slate-500 mt-4 max-w-2xl">
          A revolutionary digital currency platform that empowers individuals and
          businesses around the world.
        </p>
  
        {/* CTA Button */}
        <div className="pt-4 flex justify-center">
        {session.data?.user ? <SecondaryButton onClick={() => {
                router.push('/dashboard')
            }}>Go to Dashboard</SecondaryButton> : <SecondaryButton onClick={() => {
                signIn()
            }}>Sign-In</SecondaryButton>}
        </div>
      </section>
    );
}
