'use client';

import { useState, useEffect } from 'react';
import { ParticipationCard } from '@/components/ParticipationCard';
import { TopBar } from '@/components/TopBar';
import { Badge } from '@/components/ui/badge';
import { clsx } from 'clsx';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { Participation } from '@/lib/types';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
    const [city, setCity] = useState<string>('Cape Town'); // Default fallback
    const [feed, setFeed] = useState<Participation[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedCity = localStorage.getItem('gof_city');
        if (savedCity) {
            setCity(savedCity);
        }
    }, []);

    useEffect(() => {
        // Filter logic:
        // 1. Status is OPEN
        // 2. City matches user city OR mode is 'online'/'any'
        // 3. Sort by date
        const now = new Date().toISOString();

        const filtered = PARTICIPATION_ITEMS.filter(item => {
            if (item.status !== 'open') return false;
            // In a real app we'd filter by date > now, but for demo we leave all open items
            const matchesCity = item.city === city;
            const isRemote = item.mode === 'online' || item.mode === 'any';
            return matchesCity || isRemote;
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setFeed(filtered);
    }, [city]);

    if (!mounted) return null; // Avoid hydration mismatch

    return (
        <div className="pb-6">
            <TopBar title="Hello, Guardian" subtitle="Welcome back">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{city}</span>
                    <span className="text-xs text-muted-foreground underline opacity-60 hover:opacity-100 cursor-pointer transition-opacity">change location</span>
                </div>
            </TopBar>

            <div className="px-6 mt-4">
                <Link href="/quest" className="block w-full max-w-sm">
                    <div className="flex flex-col gap-2 p-3 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-lime/30 hover:bg-lime/5 transition-all group">
                        {/* Progress Bar Container */}
                        <div className="h-2.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                            {/* Fill (70%) */}
                            <div className="h-full bg-lime rounded-full w-[70%]" aria-label="Progress: 70%" />
                        </div>

                        {/* Text Below */}
                        <div className="flex justify-between items-center px-1">
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                3 badges to reach <span className="text-lime-dark font-bold">Steward</span>
                            </span>
                            <ArrowRight size={14} className="text-zinc-300 group-hover:text-lime-dark transition-colors" />
                        </div>
                    </div>
                </Link>
            </div>

            {/* "Your Upcoming" Section */}
            <div className="mb-8 mt-6">
                <div className="px-6 mb-4">
                    <h2 className="text-lg font-bold text-foreground">Your Upcoming</h2>
                </div>

                {/* Horizontal Slider */}
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide px-6 -mx-0">
                    {PARTICIPATION_ITEMS.slice(0, 5).map(item => (
                        <Link key={item.id} href={`/p/${item.id}`} className="snap-center shrink-0 block relative h-[35vh] sm:h-[200px] w-[80vw] sm:w-[45vw] max-w-sm rounded-2xl overflow-hidden shadow-md group active:scale-[0.99] transition-transform">
                            <img
                                src={item.imageUrl || '/images/event-local-action-1.jpg'}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                                {/* Top Labels */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                    <Badge variant="secondary" className={clsx(
                                        "text-[10px] px-1.5 py-0 h-5 font-normal backdrop-blur-md shadow-sm border-0",
                                        item.status === 'closed' ? "bg-[#E694BA] text-zinc-900" :
                                            item.type === 'challenge' ? "bg-[#8377DF] text-white" :
                                                item.type === 'webinar' ? "bg-[#EC956E] text-zinc-900" :
                                                    "bg-[#B5E28B] text-zinc-900"
                                    )}>
                                        {item.type === 'challenge' ? 'Research' : (item.type === 'event' ? 'Event' : (item.type === 'webinar' ? 'Webinar' : item.type))}
                                    </Badge>

                                    {/* Add to Calendar Button */}
                                    <button className="bg-white/20 backdrop-blur-md text-white/90 px-2 py-1 rounded-full hover:bg-white/30 transition-colors pointer-events-auto flex items-center gap-1.5">
                                        <span className="text-[10px] font-bold">Add to calendar</span>
                                        <ArrowRight size={10} className="text-white" />
                                    </button>
                                </div>

                                <h3 className="text-white font-bold text-xl leading-tight mb-1 drop-shadow-sm line-clamp-2">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
                                    <span>{new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                    <span>•</span>
                                    <span>{item.city}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Top Contributors Section */}
            <div className="mb-6 px-6">
                <h2 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide opacity-80">Top Contributors This Month</h2>
                <div className="flex flex-wrap gap-2">
                    {/* Mock members (using IDs from MEMBERS list if imported, or mocking inline for now if not available in imports) */}
                    {[
                        { name: 'Thandiwe', img: '/images/ben-den-engelsen-YUu9UAcOKZ4-unsplash.jpg' },
                        { name: 'David', img: '/images/ayo-ogunseinde-sibVwORYqs0-unsplash.jpg' },
                        { name: 'Mike', img: '/images/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg' },
                        { name: 'Sarah', img: '/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg' },
                        { name: 'Jessica', img: '/images/prince-akachi-J1OScm_uHUQ-unsplash.jpg' },
                    ].map((m, i) => (
                        <div key={i} className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-white border border-zinc-100 shadow-sm">
                            <img src={m.img} alt={m.name} className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-xs font-medium text-zinc-700">{m.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 mb-4">
                <h2 className="text-lg font-bold text-foreground">Here&apos;s what&apos;s coming up near you</h2>
            </div>
            <div className="px-6 space-y-4">
                {feed.length > 0 ? (
                    feed.map(item => (
                        <ParticipationCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="text-center py-12 text-muted">
                        <p>No upcoming activities found for {city}.</p>
                        <p className="text-sm">Try checking online events!</p>
                    </div>
                )}
            </div>
        </div >
    );
}
