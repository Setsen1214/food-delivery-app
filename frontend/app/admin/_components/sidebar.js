"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-[#17181b] text-white p-6">
            <h1 className="text-2xl font-bold mb-10">
                NomNom admin
            </h1>

            <nav className="flex flex-col gap-3">
                <Link
                    href="/admin/dishes"
                    className="px-4 py-3 rounded-xl bg-white text-black"
                >
                    Dishes
                </Link>

                <Link
                    href="/admin/orders"
                    className="px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10"
                >
                    Orders
                </Link>
            </nav>
        </aside>
    );
}