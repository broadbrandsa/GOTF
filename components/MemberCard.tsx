import { Member } from '@/lib/types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface MemberCardProps {
    member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
    return (
        <Card className="flex items-center gap-4 py-4 px-4 hover:shadow-md transition-shadow">
            {/* Avatar Placeholder */}
            <div className="w-12 h-12 rounded-full bg-lilac/30 text-lilac-800 flex items-center justify-center text-sm font-bold shadow-inner">
                {member.avatar}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">{member.name}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted font-medium">{member.city}</span>
                    <span className="text-[10px] text-zinc-300">•</span>
                    <span className="text-xs text-lime-dark font-medium">{member.tier}</span>
                </div>
            </div>

            {/* Visual tier indicator */}
            <div className="w-8 h-8 rounded-full bg-zinc-50 border border-border flex items-center justify-center text-muted">
                <span className="text-[10px]">✨</span>
            </div>
        </Card>
    );
}
