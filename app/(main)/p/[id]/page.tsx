import { notFound } from 'next/navigation';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { TopBar } from '@/components/TopBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, CheckCircle, Info, Clock, Users } from 'lucide-react';

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
    const isWebinar = item.type === 'webinar';
    const isChallenge = item.type === 'challenge';

    // Hero Image Logic
    let heroImage = '/images/event-local-action-1.jpg'; // Default fallback
    if (item.category === 'Citizen Science') heroImage = '/images/challenge-citizen-science.jpg';
    if (item.category === 'Learning' || item.type === 'webinar') heroImage = '/images/event-learning.jpg';
    if (item.title.toLowerCase().includes('water') || item.title.toLowerCase().includes('beach')) heroImage = '/images/event-water.jpg';

    return (
        <div className="pb-24">
            {/* Top Bar with back mostly handled by browser or simple back, but standardized TopBar is ok */}
            <TopBar title="" subtitle={item.category} showProfile={false} />

            {/* Hero Image */}
            <div className="px-6 mt-2 mb-4">
                <div className="w-full h-48 sm:h-56 relative rounded-2xl overflow-hidden shadow-sm">
                    <img
                        src={heroImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="px-6 space-y-6">

                {/* Title Block */}
                <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <BadgeWrapper item={item} />
                        <Badge variant="outline">{isChallenge ? 'Challenge' : isWebinar ? 'Webinar' : 'Event'}</Badge>
                        {isClosed && <Badge variant="default" className="bg-zinc-200">Closed</Badge>}
                    </div>
                    <h1 className="text-3xl font-bold leading-tight text-foreground">{item.title}</h1>
                </div>

                {/* Meta Data */}
                <div className="space-y-3 text-sm text-zinc-600">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 shrink-0 text-lime-dark" size={18} />
                        <div>
                            <p className="font-semibold text-foreground">
                                {item.mode === 'online' ? 'Online' : item.mode === 'any' ? 'Anywhere' : item.city}
                            </p>
                            {item.area && <p>{item.area}</p>}
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-3">
                        <Calendar className="shrink-0 text-lime-dark" size={18} />
                        <span>
                            {new Date(item.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </span>
                    </div>

                    {/* Badges */}
                    {item.badgesAwarded && item.badgesAwarded.length > 0 && (
                        <div className="flex items-center gap-3">
                            <div className="shrink-0 w-[18px] flex justify-center text-lime-dark">🏆</div>
                            <span className="text-lime-dark font-medium">Earn {item.badgesAwarded[0].name} Badge</span>
                        </div>
                    )}

                    {/* Research Partner */}
                    {item.researchPartner && (
                        <div className="flex items-center gap-3 pt-1">
                            <div className="shrink-0 w-[18px] flex justify-center text-zinc-400">🔬</div>
                            <span className="text-muted-foreground">Partner: <span className="font-medium text-foreground">{item.researchPartner}</span></span>
                        </div>
                    )}
                </div>

                {/* Outcome if Closed */}
                {isClosed && item.outcomeSummary && (
                    <div className="space-y-4">
                        {item.outcomeImage && (
                            <div className="w-full h-48 rounded-2xl overflow-hidden shadow-sm">
                                <img
                                    src={item.outcomeImage}
                                    alt="Outcome result"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <Card className="bg-lime/10 border-lime/30">
                            <div className="p-6">
                                <h3 className="font-bold text-lime-dark mb-2 flex items-center gap-2">
                                    <CheckCircle size={18} /> Outcome Reported
                                </h3>
                                <p className="text-foreground leading-relaxed">
                                    {item.outcomeSummary}
                                </p>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Main Content */}
                <div className="space-y-8 py-4">
                    <section>
                        <h3 className="font-bold text-lg mb-2">The Goal</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.goal}</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg mb-2">Why it matters</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.whyItMatters}</p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg mb-3">What you'll do</h3>
                        <ul className="space-y-3">
                            {item.whatYouDo.map((step, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="flex-none w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-muted">
                                        {i + 1}
                                    </span>
                                    <span className="text-muted-foreground">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Sticky Footer CTA */}
                <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 border-t border-border mx-auto max-w-md z-50 pb-8">
                    <div className="flex gap-3">
                        {item.type === 'event' && item.status === 'open' && (
                            <Button variant="outline" className="flex-1 border-lime-dark text-lime-dark hover:bg-lime/10">
                                Register
                            </Button>
                        )}
                        <Button className={`flex-1 ${isClosed ? 'bg-zinc-100 text-muted' : ''}`} disabled={isClosed}>
                            {isClosed ? 'Participation Closed' : 'Join Now'}
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}

function BadgeWrapper({ item }: { item: any }) {
    if (item.category === 'Citizen Science') return <Badge variant="lilac">{item.category}</Badge>;
    if (item.category === 'Local Action') return <Badge variant="lime">{item.category}</Badge>;
    return <Badge variant="default">{item.category}</Badge>;
}
