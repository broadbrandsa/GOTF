'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Trophy, Map, Users, Star } from 'lucide-react'; // Using icons roughly mapping to the needs
import { clsx } from 'clsx';

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: '/home', label: 'Home', icon: Home },
        { href: '/events', label: 'Events', icon: Calendar },
        { href: '/challenges', label: 'Challenges', icon: Trophy },
        { href: '/quest', label: 'Quest', icon: Map },
        { href: '/community', label: 'Community', icon: Users },
        // { href: '/outcomes', label: 'Outcomes', icon: Star }, // Outcomes might be too many for bottom nav? User listed 6 items. 
        // "BottomNav (Home, Events, Challenges, Quest, Community, Outcomes)" from prompt.
        // 6 items is a lot for mobile. But I will do it.
    ];

    // Adding Outcomes
    const allItems = [
        ...navItems,
        { href: '/outcomes', label: 'Outcomes', icon: Star }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-white/90 backdrop-blur-md pb-safe">
            <nav className="flex justify-around items-center h-16 px-2">
                {allItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-full space-y-1",
                                isActive ? "text-foreground" : "text-muted hover:text-foreground/80"
                            )}
                        >
                            <Icon size={20} className={isActive ? "stroke-[2.5px]" : "stroke-2"} />
                            <span className="text-[10px] font-medium leading-none">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            {/* Safe area spacer for iPhone home bar handled by padding-bottom env or simple spacer if needed */}
            <div className="h-6 w-full" />
        </div>
    );
}
