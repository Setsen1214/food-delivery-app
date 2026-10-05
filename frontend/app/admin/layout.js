"use client";

import Sidebar from "./_components/sidebar";
import {
    ThemeProvider,
    useTheme,
} from "./_components/theme-context";

function AdminContent({ children }) {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div
            className={
                darkMode
                    ? "flex min-h-screen bg-[#10110f] text-white"
                    : "flex min-h-screen bg-gray-100 text-black"
            }
        >
            <Sidebar />

            <main className="flex-1">
                <div className="flex justify-end p-4">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20"
                    >
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>

                {children}
            </main>
        </div>
    );
}

export default function AdminLayout({ children }) {
    return (
        <ThemeProvider>
            <AdminContent>{children}</AdminContent>
        </ThemeProvider>
    );
}