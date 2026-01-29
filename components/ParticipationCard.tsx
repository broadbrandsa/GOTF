import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Participation } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface ParticipationCardProps {
    item: Participation;
}

export function ParticipationCard({ item }: ParticipationCardProps) {
    const isClosed = item.status === 'closed';

    // Format date
    const dateObj = new Date(item.date);
    const dateString = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeString = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    return (
        <Link href={`/p/${item.id}`} className="block group">
            <Card className="transition-all active:scale-[0.98] border-border/60 hover:border-lime/50 h-full flex flex-col group-hover:shadow-md">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-1">
                        <Badge variant={item.category === 'Citizen Science' ? 'lilac' : item.category === 'Local Action' ? 'lime' : 'soft'}>
                            {item.category}
                        </Badge>
                        <div className="flex gap-1.5">
                            {item.mode === 'online' && <Badge variant="secondary" className="text-[10px] px-2">Online</Badge>}
                            {isClosed && <Badge variant="outline" className="text-muted-foreground border-border text-[10px] px-2">Closed</Badge>}
                        </div>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-lime-dark transition-colors">
                        {item.title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-lime-dark" />
                            <span>{dateString} • {timeString}</span>
                        </div>
                        {item.city && (
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-lime-dark" />
                                <span>{item.city}{item.area ? `, ${item.area}` : ''}</span>
                            </div>
                        )}
                    </div>

                    {isClosed && item.outcomeSummary && (
                        <div className="mt-4 p-3 bg-zinc-50 rounded-xl text-xs text-zinc-600 italic border border-zinc-100">
                            "{item.outcomeSummary}"
                        </div>
                    )}
                </CardContent>

                {/* Footer */}
                <CardFooter className="pt-0 flex items-center justify-between border-t border-border/30 mt-auto p-4 bg-zinc-50/50 rounded-b-2xl">
                    <span className="text-xs font-semibold text-lime-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {item.type === 'challenge' ? 'Join Challenge' : 'View Event'}
                        <ArrowRight size={12} />
                    </span>
                    {/* Visual indicator of badges */}
                    {item.badgesAwarded && item.badgesAwarded.length > 0 && (
                        <div className="flex -space-x-1">
                            {item.badgesAwarded.map(badge => (
                                <div key={badge.id} className="w-5 h-5 rounded-full bg-white border border-zinc-100 shadow-sm flex items-center justify-center text-[10px]">
                                    🏆
                                </div>
                            ))}
                        </div>
                    )}
                </CardFooter>
            </Card>
        </Link>
    );
}
