'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Trophy, Map, Users, Star, Lightbulb, Compass } from 'lucide-react'; // Using icons roughly mapping to the needs
import { clsx } from 'clsx';

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: '/home', label: 'Home', icon: Home },
        { href: '/events', label: 'Participate', icon: Calendar },
        { href: '/discover', label: 'Discover', icon: Compass },
        { href: '/community', label: 'Community', icon: Users },
        { href: '/outcomes', label: 'Outcomes', icon: Star }
    ];

    const allItems = navItems;

    return (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
            <nav className="bg-white/95 backdrop-blur-md border border-zinc-200/50 rounded-full px-6 py-3 flex items-center gap-8 pointer-events-auto">
                {allItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    // Active Circle Color Logic
                    let activeBgClass = "bg-zinc-100";
                    if (isActive) {
                        if (item.label === 'Participate') activeBgClass = "bg-[#d9f99d]"; // Lime-200ish
                        else if (item.label === 'Discover') activeBgClass = "bg-sky-200";
                        else if (item.label === 'Community') activeBgClass = "bg-orange-200";
                        else if (item.label === 'Outcomes') activeBgClass = "bg-teal-200";
                        else activeBgClass = "bg-[#d9f99d]"; // Home default (Lime)
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 relative",
                                isActive ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                            )}
                        >
                            <div className={clsx(
                                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                                isActive ? activeBgClass : "bg-transparent"
                            )}>
                                <Icon size={20} className={isActive ? "stroke-[2.5px] text-zinc-900" : "stroke-2"} />
                            </div>
                            <span className={clsx(
                                "text-[10px] font-medium leading-none transition-colors",
                                isActive ? "text-zinc-900" : "text-zinc-500"
                            )}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
