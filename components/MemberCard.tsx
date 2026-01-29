import { Member } from '@/lib/types';
import { Card } from './ui/card';

interface MemberCardProps {
    member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
    return (
        <Card className="flex items-center gap-4 py-3 px-4 hover:shadow-md transition-shadow active:scale-[0.99] border-border/60">
            {/* Avatar Placeholder */}
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold overflow-hidden border border-border">
                <img src="/images/profile-icon.jpg" alt={member.name} className="w-full h-full object-cover opacity-90" />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground truncate">{member.name}</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs text-muted-foreground">{member.city}</span>
                    <span className="text-[8px] text-zinc-300">•</span>
                    <span className="text-xs text-lime-dark font-medium bg-lime/10 px-1.5 py-0.5 rounded-md">{member.tier}</span>
                </div>
            </div>

            {/* Visual tier indicator */}
            <div className="w-7 h-7 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-muted-foreground">
                <span className="text-xs">👋</span>
            </div>
        </Card>
    );
}
