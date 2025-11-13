'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-display">
            <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
              <Image 
                src="/conversationalist/logo.png" 
                alt="The Conversationalist" 
                width={200}
                height={40}
                className="h-7 w-auto"
                priority
              />
            </Link>
          </h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:text-tc-yellow transition-colors font-medium">
              Map
            </Link>
            <Link href="/events" className="hover:text-tc-yellow transition-colors font-medium">
              Events
            </Link>
            <Link href="/people" className="hover:text-tc-yellow transition-colors font-medium">
              Find People
            </Link>
            <Link href="/profile" className="hover:text-tc-yellow transition-colors font-medium">
              Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="hover:text-tc-yellow transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Map
              </Link>
              <Link 
                href="/events" 
                className="hover:text-tc-yellow transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/people" 
                className="hover:text-tc-yellow transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Find People
              </Link>
              <Link 
                href="/profile" 
                className="hover:text-tc-yellow transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
