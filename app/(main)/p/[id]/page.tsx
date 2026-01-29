import { notFound } from 'next/navigation';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { TopBar } from '@/components/TopBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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

    return (
        <div className="pb-24">
            {/* Top Bar for safe area - no title/subtitle, custom back handled below */}
            <TopBar title="" showProfile={false} />

            {/* Back Button */}
            <div className="px-6 py-2">
                <Link href={item.type === 'challenge' ? '/challenges' : '/events'} className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors w-fit">
                    <ArrowLeft size={16} />
                    Back
                </Link>
            </div>

            {/* Hero Image */}
            <div className="px-6 mt-2 mb-4">
                <div className="w-full h-48 sm:h-56 relative rounded-2xl overflow-hidden shadow-sm bg-zinc-100">
                    <img
                        src={item.imageUrl || '/images/event-local-action-1.jpg'}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="px-6 space-y-6">

                {/* Header Section */}
                <div>
                    {/* Pills Row: Type + Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-lime/10 text-lime-dark hover:bg-lime/20 border-lime/20 capitalize font-medium">
                            {item.type}
                        </Badge>
                        {/* Earn Badge Pill */}
                        {(item.badgesAwarded?.length || 0) > 0 && (
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-zinc-200 bg-zinc-50 text-[10px] font-semibold text-zinc-600 shadow-sm">
                                Earn {item.badgesAwarded?.length} badge{item.badgesAwarded!.length > 1 ? 's' : ''}
                            </div>
                        )}
                        {isClosed && <Badge variant="outline" className="text-muted-foreground">Closed</Badge>}
                    </div>

                    <h1 className="text-2xl font-bold leading-tight text-foreground mb-3">{item.title}</h1>

                    {/* Goal Text directly under title */}
                    <p className="text-base text-zinc-600 leading-relaxed font-medium">
                        {item.goal}
                    </p>
                </div>

                {/* Meta Data */}
                <div className="space-y-3 text-sm text-zinc-600 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
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
                        <div className="flex items-start gap-3 pt-2 border-t border-dashed border-zinc-200 mt-2">
                            <div className="shrink-0 w-[18px] flex justify-center text-sky-600">🔬</div>
                            <span className="text-muted-foreground">Partner: <span className="font-semibold text-sky-700">{item.researchPartner}</span></span>
                        </div>
                    )}
                </div>

                {/* CTA Button (Insert above "Why It Matters") */}
                {!isClosed && (
                    <Button className="w-full rounded-full h-12 text-base font-bold bg-lime text-lime-dark hover:bg-lime-400 shadow-sm transition-all active:scale-[0.99]">
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

                {/* Main Content Sections */}
                <div className="space-y-8 py-2">
                    <section>
                        <h3 className="font-bold text-lg mb-2">Why it matters</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{item.whyItMatters}</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg mb-3">What you'll do</h3>
                        <ul className="space-y-3">
                            {item.whatYouDo.map((step, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="flex-none w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-muted-foreground border border-zinc-200">
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
