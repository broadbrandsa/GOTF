import { notFound } from 'next/navigation';
import { PARTICIPATION_ITEMS, MEMBERS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { clsx } from 'clsx';

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

    // Determine Page Background & Text Color based on type
    let pageBgClass = "bg-[#002700]"; // Fallback
    let textColorClass = "text-white";

    if (isClosed) {
        pageBgClass = "bg-[#E694BA]"; // Impact Report
        textColorClass = "text-zinc-900";
    } else {
        switch (item.type) {
            case 'event':
                pageBgClass = "bg-[#B5E28B]";
                textColorClass = "text-zinc-900";
                break;
            case 'challenge': // Research
                pageBgClass = "bg-[#8377DF]";
                textColorClass = "text-white";
                break;
            case 'webinar':
                pageBgClass = "bg-[#EC956E]";
                textColorClass = "text-zinc-900";
                break;
        }
    }

    return (
        <div className={clsx("min-h-screen pb-24", pageBgClass, textColorClass)}>
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
                    <Link href={item.category === 'Learning' ? '/discover' : '/events'} className="flex items-center justify-center w-8 h-8 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
                        <ArrowLeft size={16} />
                    </Link>
                </div>

                {/* Bottom Blur Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end px-6 pb-8 z-10 pointer-events-none">
                    {/* Content Container */}
                    <div className="pointer-events-auto text-left">

                        {/* Pills Row (Type + Status + Earn Badge) */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            {/* Type Pill */}
                            <Badge variant="secondary" className={clsx(
                                "backdrop-blur-md hover:bg-white border-white/20 capitalize font-medium shadow-sm px-2.5 py-0.5 h-6",
                                item.type === 'event' ? "bg-white/90 text-lime-900" : "bg-white/90 text-black"
                            )}>
                                {item.type === 'challenge' ? 'Research' : (item.type === 'event' ? 'Event' : (item.type === 'webinar' ? 'Webinar' : item.type))}
                            </Badge>

                            {/* Status Pill */}
                            {!isClosed && (
                                <span className={clsx("text-[10px] px-2.5 h-6 flex items-center rounded-full font-bold border shadow-sm backdrop-blur-md", statusClasses)}>
                                    {statusLabel}
                                </span>
                            )}
                            {isClosed && (
                                <span className="text-[10px] px-2.5 h-6 flex items-center rounded-full font-bold bg-zinc-800/80 text-white backdrop-blur-md border border-white/10 shadow-sm">
                                    Closed
                                </span>
                            )}

                            {/* Gamification Pill */}
                            {item.earnedBadgeName && (
                                <div className="inline-flex items-center px-2.5 h-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white shadow-sm">
                                    <span className="mr-1 text-sm">🏆</span>
                                    Earn {item.badgesAwarded?.length && item.badgesAwarded.length > 1 ? `${item.badgesAwarded.length} badges` : `a ${item.earnedBadgeName} badge`}
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white drop-shadow-sm mb-2">
                            {item.title}
                        </h1>

                        {/* Goal Description (Short) */}
                        <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed line-clamp-3">
                            {item.goal}
                        </p>
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
                        {item.type === 'challenge' ? 'Join Research' : 'Join Event'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                )}

                {/* Members Joined (Open) */}
                {!isClosed && item.joinedMemberIds && item.joinedMemberIds.length > 0 && (
                    <div className="space-y-3 pt-2">
                        <p className="text-sm font-medium text-zinc-600">
                            {item.joinedMemberIds.length} members have joined this {item.type === 'challenge' ? 'Research' : 'Event'}.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {item.joinedMemberIds.map(mid => {
                                const member = MEMBERS.find(m => m.id === mid);
                                if (!member) return null;
                                return (
                                    <div key={mid} className="flex items-center gap-2 pl-1 pr-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full shadow-sm hover:border-lime/30 transition-colors">
                                        <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-200">
                                            <img src={member.avatarImage || '/images/profile-icon.jpg'} alt={member.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-xs font-semibold text-zinc-700">{member.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Outcome if Closed */}
                {isClosed && item.outcomeSummary && (
                    <div className="space-y-4">
                        <Card className="bg-lime/10 border-lime/30 overflow-hidden">
                            <div className="p-6">
                                <h3 className="font-bold text-lime-dark mb-2 flex items-center gap-2">
                                    <CheckCircle size={18} /> Outcome Reported
                                    <Badge variant="outline" className={clsx(
                                        "backdrop-blur-md border-white/40 text-white font-medium capitalize shadow-sm px-2.5 py-0.5 h-6",
                                        isClosed && "bg-zinc-800/80 border-zinc-700"
                                    )}>
                                        {item.status === 'open' ? 'Open' : 'Closed'}
                                    </Badge>
                                </h3>
                                <h1 className="text-3xl font-bold leading-tight mb-2 drop-shadow-md">{item.title}</h1>
                                <div className="flex items-center gap-4 text-sm font-medium opacity-90">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(item.date).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {item.city}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            <div className="px-6 py-8">
                {/* Stats Row */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {/* ... stats ... */}
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    <section>
                        <h3 className={clsx("font-bold text-lg mb-2", textColorClass)}>Why it matters</h3>
                        <p className={clsx("leading-relaxed text-sm opacity-90", textColorClass)}>{item.whyItMatters}</p>
                    </section>

                    <section>
                        <h3 className={clsx("font-bold text-lg mb-3", textColorClass)}>{isClosed ? 'What was done' : "What you'll do"}</h3>
                        <ul className="space-y-3">
                            {(isClosed && item.whatWasDone ? item.whatWasDone : item.whatYouDo).map((step, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className={clsx(
                                        "flex-none w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border",
                                        // Adjust step circle colors based on background
                                        textColorClass === 'text-white' ? "bg-white/20 text-white border-white/30" : "bg-black/10 text-black border-black/10"
                                    )}>
                                        {isClosed ? <CheckCircle size={12} /> : i + 1}
                                    </span>
                                    <span className={clsx("text-sm leading-relaxed pt-0.5 opacity-90", textColorClass)}>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
