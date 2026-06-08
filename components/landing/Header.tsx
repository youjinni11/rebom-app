"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "PHILOSOPHY", href: "#philosophy" },
  { label: "MEMBERSHIP", href: "#membership" },
  { label: "CONTACT", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/90 backdrop-blur-sm border-b border-[#e8e6e1]/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-xl font-semibold text-[#1a1a1a] tracking-tight">
            리봄
          </span>
          <span className="w-2 h-2 rounded-sm bg-teal" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium tracking-[0.2em] text-[#666] hover:text-teal transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden p-2 text-[#666]"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 열기"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-[#e8e6e1] bg-[#faf9f6] px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-[0.15em] text-[#666] hover:text-teal"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
