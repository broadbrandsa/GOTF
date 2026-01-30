import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Participation } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { clsx } from 'clsx';

interface ParticipationCardProps {
    item: Participation;
}

export function ParticipationCard({ item }: ParticipationCardProps) {
    const isClosed = item.status === 'closed';
    const isOnline = item.mode === 'online';

    // Status Pill Logic
    const now = new Date();
    const startDate = new Date(item.date);
    const isUpcoming = startDate > now;
    const statusLabel = isUpcoming ? "Upcoming" : "Live";
    const statusColor = isUpcoming ? "bg-zinc-100 text-zinc-600" : "bg-red-50 text-red-600 animate-pulse border-red-100";

    return (
        <Link href={`/p/${item.id}`} className="block group">
            <Card className="hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden flex h-32 active:scale-[0.99]">
                {/* Content Section (Left) */}
                <div className="flex-1 flex flex-col justify-between p-4 min-w-0">
                    <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                            {/* Badges Row */}
                            <div className="flex flex-wrap gap-1.5 items-center">
                                <Badge variant="secondary" className={clsx(
                                    "text-[10px] px-1.5 py-0 h-5 font-normal",
                                    item.category === 'Citizen Science' ? "bg-sky-100 text-sky-700 hover:bg-sky-100" :
                                        item.category === 'Learning' ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                                            (item.type === 'event' ? "bg-lime/20 text-lime-900 hover:bg-lime/20" : "bg-lime/20 text-lime-dark hover:bg-lime/20")
                                )}>
                                    {item.type === 'challenge' ? 'Research' : (item.type === 'event' ? 'Event' : item.type)}
                                </Badge>

                                {/* Status Pill (Only for Open items) */}
                                {!isClosed && (
                                    <span className={clsx("text-[9px] px-1.5 py-0.5 rounded-full font-semibold border border-transparent", statusColor)}>
                                        {statusLabel}
                                    </span>
                                )}
                            </div>
                        </div>

                        <h3 className="font-bold text-sm leading-tight group-hover:text-lime-dark transition-colors line-clamp-2 mt-1">
                            {item.title}
                        </h3>
                    </div>

                    <div className="space-y-1 mt-auto">
                        <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar size={12} className="mr-1.5 shrink-0" />
                            {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground truncate">
                            <MapPin size={12} className="mr-1.5 shrink-0" />
                            {isOnline ? (
                                <span className="font-medium text-indigo-500">{item.platform || 'Online'}</span>
                            ) : (
                                <span className="truncate">{item.area || item.city}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Image Section (Right) */}
                <div className="w-28 shrink-0 h-full relative bg-zinc-100">
                    <img
                        src={item.imageUrl || '/images/event-local-action-1.jpg'}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Card>
        </Link>
    );
}
