"use client";
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { PrimaryButton } from "./Button";



function Appbar() {
  const session = useSession();

  return (
    <header className="bg-gray-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / App Name */}
        <h1 className="text-gray-900 text-3xl font-bold tracking-wide">
          TradeHorizon
        </h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link
                href="/"
                className=" text-slate-500 hover:text-slate-700 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className=" text-slate-500 hover:text-slate-700 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className=" text-slate-500 hover:text-slate-700 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div>
            {session.data?.user ? <PrimaryButton onClick={() => {
                signOut()
            }}>Logout</PrimaryButton> : <PrimaryButton onClick={() => {
                signIn()
            }}>Sign-In</PrimaryButton>}
        </div>
      </div>
    </header>
  );
};

export default Appbar;