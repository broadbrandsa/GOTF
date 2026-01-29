import Link from 'next/link';
import { Participation } from '@/lib/types';
import { Card } from './ui/Card';
import { ArrowUpRight } from 'lucide-react';

interface OutcomeCardProps {
    item: Participation;
}

export function OutcomeCard({ item }: OutcomeCardProps) {
    if (!item.outcomeSummary) return null;

    return (
        <Link href={`/p/${item.id}`} className="block group">
            <Card className="hover:shadow-md transition-all active:scale-[0.99] border-transparent">
                <div className="flex justify-between items-start mb-4">
                    <div className="text-xs font-bold tracking-wider text-lime-dark uppercase">
                        Impact Report
                    </div>
                    <ArrowUpRight size={16} className="text-muted group-hover:text-lime-dark transition-colors" />
                </div>

                <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-lime-dark transition-colors">
                    {item.title}
                </h3>

                <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 italic text-zinc-700 leading-relaxed font-medium">
                    "{item.outcomeSummary}"
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span>{item.city}</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
            </Card>
        </Link>
    );
}
