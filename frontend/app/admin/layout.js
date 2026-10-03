import Sidebar from "./_components/sidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#10110f]">
            <Sidebar />

            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}