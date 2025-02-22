"use client";
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Appbar() {
  const { data: session } = useSession(); // Destructure session data

  return (
    <header className="bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / App Name */}
        <h1 className="text-white text-3xl font-bold tracking-wide">
          TradeHorizon
        </h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div>
          {session ? ( // Check if session exists
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-md transition duration-300"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-md transition duration-300"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Appbar;