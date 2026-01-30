import { Member } from '@/lib/types';
import { Card } from './ui/card';

interface MemberCardProps {
    member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
    return (
        <Card className="flex items-center gap-4 py-3 px-4 backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/15 transition-all text-white active:scale-[0.99] shadow-sm">
            {/* Avatar Image */}
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/30 shadow-sm relative">
                {/* Fallback color if image fails to load, though we expect it to work */}
                <div className="absolute inset-0 bg-zinc-800" />
                <img
                    src={member.avatarImage}
                    alt={member.name}
                    className="w-full h-full object-cover relative z-10"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold text-sm text-white truncate">{member.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs text-white/70">{member.city}</span>
                            <span className="text-[8px] text-white/30">•</span>
                            <span className="text-xs text-lime-300 font-medium bg-lime/20 border border-lime/30 px-1.5 py-0.5 rounded-md">{member.tier}</span>
                        </div>
                    </div>
                </div>

                {/* Badges Pill */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 text-[10px] font-medium text-white/80 border border-white/10">
                    <span>Badges Earned</span>
                    <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] text-white font-bold leading-none">
                        {member.badgesEarned}
                    </span>
                </div>
            </div>
        </Card>
    );
}
