import { notFound } from 'next/navigation';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { clsx } from 'clsx';
import { TopBar } from '@/components/TopBar';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ParticipationDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const item = PARTICIPATION_ITEMS.find(p => p.id === id);

    if (!item) {
        notFound();
    }

    const isClosed = item.status === 'closed';

    // Status Pill Logic
    const now = new Date();
    const startDate = new Date(item.date);
    const isUpcoming = startDate > now;
    const statusLabel = isUpcoming ? "Upcoming" : "Live";

    // Status colors for hero overlay (high contrast)
    const statusClasses = isUpcoming
        ? "bg-white/90 text-zinc-900 border-white/20"
        : "bg-red-500/90 text-white animate-pulse border-red-400/50";

    return (
        <div className="pb-24 bg-background min-h-screen">
            {/* 50vh Hero Section */}
            <div className="relative w-full h-[50vh]">
                {/* Background Image */}
                <img
                    src={item.imageUrl || '/images/event-local-action-1.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />

                {/* Back Button (Absolute Top Left) */}
                <div className="absolute top-4 left-6 z-20">
                    <Link href={item.type === 'challenge' ? '/challenges' : '/events'} className="flex items-center justify-center w-8 h-8 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
                        <ArrowLeft size={16} />
                    </Link>
                </div>

                {/* Type Pill (Top Left, below back button area or inline?) 
                    Request: "Move type pill to top-left of hero image" 
                    Let's place it below the back button to not crowd it, or aligned with it?
                    "Position absolute top-left inside the image."
                    Let's put it at top-16 (approx 64px down) to clear the back button area safely.
                */}
                <div className="absolute top-16 left-6 z-20">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-black hover:bg-white border-white/20 capitalize font-medium shadow-sm px-3 py-1">
                        {item.type}
                    </Badge>
                </div>

                {/* Status Pill (Top Right) */}
                {!isClosed && (
                    <div className="absolute top-16 right-6 z-20">
                        <span className={clsx("text-[10px] px-2.5 py-1 rounded-full font-bold border shadow-sm backdrop-blur-md", statusClasses)}>
                            {statusLabel}
                        </span>
                    </div>
                )}
                {isClosed && (
                    <div className="absolute top-16 right-6 z-20">
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-zinc-800/80 text-white backdrop-blur-md border border-white/10 shadow-sm">
                            Closed
                        </span>
                    </div>
                )}


                {/* Bottom Blur Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end px-6 pb-8 z-10 pointer-events-none">
                    {/* Content Container */}
                    <div className="pointer-events-auto space-y-2">
                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white drop-shadow-sm">
                            {item.title}
                        </h1>

                        {/* Goal Description (Short) */}
                        <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed line-clamp-3 mb-1">
                            {item.goal}
                        </p>

                        {/* Gamification Pill */}
                        {(item.badgesAwarded?.length || 0) > 0 && (
                            <div className="flex items-center gap-2 pt-2">
                                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-sm">
                                    <span className="mr-1.5 text-base">🏆</span>
                                    Earn {item.badgesAwarded?.length} badge{item.badgesAwarded!.length > 1 ? 's' : ''}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Body */}
            <div className="px-6 py-8 space-y-8">

                {/* Meta Data Panel */}
                <div className="space-y-4 text-sm text-zinc-600 bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                    {/* Date */}
                    <div className="flex items-center gap-3">
                        <Calendar className="shrink-0 text-lime-dark" size={18} />
                        <span className="font-medium text-foreground">
                            {new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 shrink-0 text-lime-dark" size={18} />
                        <div>
                            <span className="font-medium text-foreground">
                                {item.mode === 'online' ? (item.platform || 'Online') : item.city}
                            </span>
                            {(item.area && item.mode !== 'online') && <span className="text-muted-foreground">, {item.area}</span>}
                        </div>
                    </div>

                    {/* Research Partner */}
                    {item.researchPartner && (
                        <div className="flex items-start gap-3 pt-3 border-t border-dashed border-zinc-200 mt-1">
                            <div className="shrink-0 w-[18px] flex justify-center text-sky-600">🔬</div>
                            <span className="text-muted-foreground">Partner: <span className="font-semibold text-sky-700">{item.researchPartner}</span></span>
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                {!isClosed && (
                    <Button className="w-full rounded-full h-12 text-base font-bold bg-lime text-zinc-900 hover:bg-lime-400 shadow-sm transition-all active:scale-[0.99] border border-lime-400/50">
                        {item.type === 'challenge' ? 'Join Challenge' : 'Join Event'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                )}

                {/* Outcome if Closed */}
                {isClosed && item.outcomeSummary && (
                    <div className="space-y-4">
                        <Card className="bg-lime/10 border-lime/30 overflow-hidden">
                            <div className="p-6">
                                <h3 className="font-bold text-lime-dark mb-2 flex items-center gap-2">
                                    <CheckCircle size={18} /> Outcome Reported
                                </h3>
                                <p className="text-foreground leading-relaxed text-sm">
                                    {item.outcomeSummary}
                                </p>
                            </div>
                        </Card>
                        {item.outcomeImage && (
                            <div className="w-full h-48 rounded-2xl overflow-hidden shadow-sm">
                                <img
                                    src={item.outcomeImage}
                                    alt="Outcome result"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Content Sections */}
                <div className="space-y-8">
                    <section>
                        <h3 className="font-bold text-lg mb-2 text-foreground">Why it matters</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{item.whyItMatters}</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg mb-3 text-foreground">What you'll do</h3>
                        <ul className="space-y-3">
                            {item.whatYouDo.map((step, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="flex-none w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500 border border-zinc-200">
                                        {i + 1}
                                    </span>
                                    <span className="text-muted-foreground text-sm leading-relaxed pt-0.5">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
