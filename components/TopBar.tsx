import { UserCircle } from 'lucide-react';

interface TopBarProps {
    title?: string;
    subtitle?: string;
    showProfile?: boolean;
}

export function TopBar({ title, subtitle, showProfile = true }: TopBarProps) {
    return (
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
            <div>
                {subtitle && <p className="text-xs font-semibold text-lime-dark tracking-wide uppercase mb-1">{subtitle}</p>}
                {title && <h1 className="text-2xl font-semibold text-foreground">{title}</h1>}
            </div>
            {showProfile && (
                <div className="w-9 h-9 rounded-full overflow-hidden border border-border shadow-sm">
                    <img src="/images/profile-icon.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
    );
}
