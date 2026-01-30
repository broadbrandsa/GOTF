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
        <div className="sticky top-0 z-40 bg-[#002700] backdrop-blur-md border-b border-white/10 px-6 pt-12 pb-4 flex justify-between items-end transition-all duration-300">
            <div>
                {subtitle && <p className="text-xs font-semibold text-white/70 tracking-wide uppercase mb-1">{subtitle}</p>}
                {title && <h1 className="text-2xl font-bold text-white leading-none">{title}</h1>}
            </div>
            {showProfile && (
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Bell size={20} className="text-white/70" />
                        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-[#002700]" />
                    </div>
                    <Link href="/profile" className="w-9 h-9 rounded-full overflow-hidden border border-white/20 shadow-sm">
                        <img src="/images/profile-icon.jpg" alt="Profile" className="w-full h-full object-cover" />
                    </Link>
                </div>
            )}
            {children && <div className="mt-1">{children}</div>}
        </div>
    );
}
