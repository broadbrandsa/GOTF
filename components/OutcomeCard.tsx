import Link from 'next/link';
import { Participation } from '@/lib/types';
import { Card, CardContent } from './ui/card';
import { ArrowUpRight } from 'lucide-react';

interface OutcomeCardProps {
    item: Participation;
}

export function OutcomeCard({ item }: OutcomeCardProps) {
    if (!item.outcomeSummary) return null;

    return (
        <Link href={`/p/${item.id}`} className="block group">
            <Card className="hover:shadow-md transition-all active:scale-[0.99] border-border/50 group-hover:border-lime/30">
                <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-[10px] font-bold tracking-widest text-lime-dark uppercase bg-lime/10 px-2 py-1 rounded-md">
                            Impact Report
                        </div>
                        <div className="bg-zinc-100 p-1.5 rounded-full group-hover:bg-lime/20 transition-colors">
                            <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-lime-dark" />
                        </div>
                    </div>

                    {item.outcomeImage && (
                        <div className="mb-4 rounded-xl overflow-hidden h-32 w-full relative">
                            <img src={item.outcomeImage} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-lime-dark transition-colors">
                        {item.title}
                    </h3>

                    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 text-zinc-700 leading-relaxed font-medium text-sm">
                        "{item.outcomeSummary}"
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-medium">
                        <span>{item.city}</span>
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
