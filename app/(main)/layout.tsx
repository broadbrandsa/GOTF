import { BottomNav } from "@/components/BottomNav";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen pb-24 relative">
            {/* pb-24 ensures content doesn't get hidden behind bottom nav */}
            <main className="mx-auto max-w-md min-h-screen overflow-hidden">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
