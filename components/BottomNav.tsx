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
        { href: '/community', label: 'Community', icon: Users },
        { href: '/outcomes', label: 'Outcomes', icon: Star }
    ];

    const allItems = navItems;

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-white/90 backdrop-blur-md pb-safe">
            <nav className="flex justify-around items-center h-16 px-2">
                {allItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    // Simple color logic
                    let activeColorClass = "text-foreground";
                    if (isActive) {
                        if (item.label === 'Events') activeColorClass = "text-lime-dark";
                        else if (item.label === 'Challenges') activeColorClass = "text-sky-600";
                        else if (item.label === 'Community') activeColorClass = "text-orange-500";
                        else if (item.label === 'Outcomes') activeColorClass = "text-teal-600";
                        else activeColorClass = "text-lime-dark"; // Home default
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 relative",
                                isActive ? activeColorClass : "text-muted hover:text-foreground/80"
                            )}
                        >
                            <div className="relative">
                                <Icon size={20} className={isActive ? "stroke-[2.5px]" : "stroke-2"} />
                                {isActive && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current" />}
                            </div>
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
