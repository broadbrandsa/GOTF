import { BottomNav } from "@/components/BottomNav";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background pb-24 relative">
            {/* pb-24 ensures content doesn't get hidden behind bottom nav */}
            <main className="mx-auto max-w-md min-h-screen bg-background shadow-2xl overflow-hidden">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
