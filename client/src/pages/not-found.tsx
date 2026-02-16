import React from "react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-serif mb-4 uppercase tracking-[0.2em]">404</h1>
      <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-8">
        This route does not exist.
      </p>
      <Link href="/">
        <a className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest border border-zinc-800 px-6 py-2 hover:bg-white hover:text-black transition-colors">
          Return Home
        </a>
      </Link>
    </div>
  );
}
