import { UserCircle, Bell } from 'lucide-react';
import Link from 'next/link';

interface TopBarProps {
    title?: string;
    subtitle?: string;
    showProfile?: boolean;
    children?: React.ReactNode;
}

export function TopBar({ title, subtitle, showProfile = true, children }: TopBarProps) {
    return (
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    {subtitle && <p className="text-xs font-semibold text-lime-dark tracking-wide uppercase mb-1">{subtitle}</p>}
                    {title && <h1 className="text-2xl font-semibold text-foreground">{title}</h1>}
                </div>
                {showProfile && (
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Bell size={20} className="text-zinc-500" />
                            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-white" />
                        </div>
                        <Link href="/profile" className="w-9 h-9 rounded-full overflow-hidden border border-border shadow-sm">
                            <img src="/images/profile-icon.jpg" alt="Profile" className="w-full h-full object-cover" />
                        </Link>
                    </div>
                )}
            </div>
            {children && <div className="mt-1">{children}</div>}
        </div>
    );
}
