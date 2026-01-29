import { Member } from '@/lib/types';
import { Card } from './ui/card';

interface MemberCardProps {
    member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
    return (
        <Card className="flex items-center gap-4 py-3 px-4 hover:shadow-md transition-shadow active:scale-[0.99] border-border/60">
            {/* Avatar Image */}
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-zinc-100 shadow-sm relative">
                {/* Fallback color if image fails to load, though we expect it to work */}
                <div className="absolute inset-0 bg-zinc-100" />
                <img
                    src={member.avatarImage}
                    alt={member.name}
                    className="w-full h-full object-cover relative z-10"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold text-sm text-foreground truncate">{member.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs text-muted-foreground">{member.city}</span>
                            <span className="text-[8px] text-zinc-300">•</span>
                            <span className="text-xs text-lime-dark font-medium bg-lime/10 px-1.5 py-0.5 rounded-md">{member.tier}</span>
                        </div>
                    </div>
                </div>

                {/* Badges Pill */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-50 text-[10px] font-medium text-zinc-500 border border-zinc-200/60">
                    <span>Badges Earned</span>
                    <span className="w-4 h-4 rounded-full bg-zinc-200 flex items-center justify-center text-[9px] text-zinc-700 font-bold leading-none">
                        {member.badgesEarned}
                    </span>
                </div>
            </div>
        </Card>
    );
}
