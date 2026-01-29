import { Badge as BadgeType } from '@/lib/types';
import * as Icons from 'lucide-react';
import { clsx } from 'clsx';
import { LucideIcon } from 'lucide-react';

interface BadgeIconProps {
    badge: BadgeType;
    isUnlocked: boolean;
}

export function BadgeIcon({ badge, isUnlocked }: BadgeIconProps) {
    // Dynamic icon lookup
    // @ts-ignore
    const Icon = Icons[badge.icon] as LucideIcon | undefined || Icons.Award;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className={clsx(
                "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
                isUnlocked
                    ? "bg-lime text-lime-800 shadow-md scale-100 ring-4 ring-lime/20"
                    : "bg-zinc-100 text-zinc-300 grayscale"
            )}>
                <Icon size={32} strokeWidth={isUnlocked ? 2 : 1.5} />
            </div>
            <div className="text-center">
                <p className={clsx("text-xs font-semibold leading-tight", isUnlocked ? "text-foreground" : "text-muted")}>
                    {badge.name}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1 max-w-[80px]">
                    {isUnlocked ? badge.description : 'Locked'}
                </p>
            </div>
        </div>
    );
}
