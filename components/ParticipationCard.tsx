import Link from 'next/link';
import { Calendar, MapPin, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Participation } from '@/lib/types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

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
            <Card className="transition-transform active:scale-[0.98] border-transparent hover:border-lime/50 h-full flex flex-col">
                {/* Header Tags */}
                <div className="flex justify-between items-start mb-3">
                    <Badge variant={item.category === 'Citizen Science' ? 'lilac' : item.category === 'Local Action' ? 'lime' : 'default'}>
                        {item.category}
                    </Badge>
                    <div className="flex gap-1">
                        {item.mode === 'online' && <Badge variant="secondary">Online</Badge>}
                        {isClosed && <Badge variant="outline" className="text-muted border-muted">Closed</Badge>}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-lime-dark transition-colors">
                        {item.title}
                    </h3>

                    <div className="space-y-2 text-sm text-muted">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{dateString} • {timeString}</span>
                        </div>
                        {item.city && (
                            <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                <span>{item.city}{item.area ? `, ${item.area}` : ''}</span>
                            </div>
                        )}
                    </div>

                    {isClosed && item.outcomeSummary && (
                        <div className="mt-4 p-3 bg-zinc-50 rounded-xl text-xs text-zinc-600 italic border border-zinc-100">
                            "{item.outcomeSummary}"
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                    <span className="text-xs font-medium text-lime-dark flex items-center gap-1">
                        {item.type === 'challenge' ? 'Join Challenge' : 'View Event'}
                        <ArrowRight size={12} />
                    </span>
                    {/* Visual indicator of badges */}
                    {item.badgesAwarded && item.badgesAwarded.length > 0 && (
                        <div className="flex -space-x-1">
                            {item.badgesAwarded.map(badge => (
                                <div key={badge.id} className="w-5 h-5 rounded-full bg-zinc-100 border border-white flex items-center justify-center text-[10px]">
                                    🏆
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Card>
        </Link>
    );
}
