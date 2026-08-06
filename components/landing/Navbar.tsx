"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Templates", href: "#templates" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  userInitials?: string;
}

export default function Navbar({ 
  isLoggedIn = false, 
  userName = "User", 
  userInitials = "U" 
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
      setOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl shadow-xs">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 leading-none">
              Resumify<span className="text-indigo-600">.AI</span>
            </span>
            <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase mt-1">
              AI Resume Builder
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-base font-semibold text-gray-700 hover:text-indigo-600 transition cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* User Profile / Auth */}
        <div className="hidden items-center gap-4 md:flex">
          {isLoggedIn ? (
            <Link href="/dashboard">
              <div className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition cursor-pointer shadow-xs">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {userInitials}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-gray-800 leading-tight">{userName}</span>
                  <span className="text-[11px] text-gray-500 font-medium">Pro Member</span>
                </div>
              </div>
            </Link>
          ) : (
            <>
              <Link href="/login" className="rounded-xl border border-gray-300 px-6 py-2.5 text-base font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600">
                Login
              </Link>
              <Link href="/register" className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-base font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:scale-[1.02]">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl p-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition md:hidden focus:outline-none"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-gray-100 bg-white md:hidden shadow-xl">
          <div className="space-y-2 px-6 py-6">
            {isLoggedIn && (
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <div className="flex items-center gap-3 pb-4 mb-2 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base">
                    {userInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{userName}</h4>
                    <p className="text-xs text-indigo-600 font-medium">Pro Member</p>
                  </div>
                </div>
              </Link>
            )}

            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="block rounded-xl px-4 py-3 text-base font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer"
              >
                {item.name}
              </a>
            ))}

            {!isLoggedIn && (
              <div className="pt-4 flex flex-col gap-2">
                <Link href="/login" className="w-full text-center rounded-xl border border-gray-300 py-3 text-base font-semibold text-gray-700">
                  Login
                </Link>
                <Link href="/register" className="w-full text-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-base font-semibold text-white">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}