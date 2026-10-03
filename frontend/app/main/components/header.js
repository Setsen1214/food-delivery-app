"use client";

import Link from "next/link";

export default function Header({ cartCount = 0 }) {
    return (
        <header className="w-full bg-[#17181b] text-white">
            <div className="max-w-[1400px] mx-auto h-[72px] px-6 flex items-center justify-between ">

                {/* LOGO */}
                <Link
                    href="/main"
                    className="flex items-center gap-3"
                >
                    {/* NomNom icon */}
                    <div className="relative w-12 h-10 flex items-center justify-center">
                        <div className="absolute w-10 h-5 bg-[#ff4b45] rounded-t-full top-1"></div>

                        <div className="absolute w-12 h-1 bg-[#ff4b45] rounded-full top-[19px]"></div>

                        <div className="absolute w-7 h-1 bg-[#17181b] rounded-full top-[14px]"></div>
                    </div>

                    {/* Logo text */}
                    <div className="leading-none">
                        <div className="text-[20px] font-semibold">
                            <span className="text-white">Nom</span>
                            <span className="text-[#ff4b45]">Nom</span>
                        </div>

                        <p className="text-[10px] text-gray-400 mt-1">
                            Swift delivery
                        </p>
                    </div>
                </Link>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3 translate-x-6">

                    {/* DELIVERY ADDRESS */}
                    <button
                        type="button"
                        className="h-10 px-4 bg-white rounded-full text-sm flex items-center gap-2 text-gray-500"
                    >
                        {/* Location icon */}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ff4b45"
                            strokeWidth="2"
                        >
                            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                            <circle cx="12" cy="10" r="2.5" />
                        </svg>

                        <span className="text-[#ff4b45]">
                            Delivery address:
                        </span>

                        <span>
                            Add Location
                        </span>

                        {/* Arrow */}
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#777"
                            strokeWidth="2"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>

                    {/* CART */}
                    <button
                        type="button"
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#222"
                            strokeWidth="1.8"
                        >
                            <circle cx="9" cy="20" r="1" />
                            <circle cx="18" cy="20" r="1" />
                            <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
                        </svg>

                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ff4b45] text-white text-[10px] flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* PROFILE */}
                    <button
                        type="button"
                        className="w-10 h-10 bg-[#ff4b45] rounded-full flex items-center justify-center"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.8"
                        >
                            <circle cx="12" cy="8" r="3" />
                            <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
                        </svg>
                    </button>

                </div>
            </div>
        </header>
    );
}