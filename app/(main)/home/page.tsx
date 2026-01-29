'use client';

import { useState, useEffect } from 'react';
import { ParticipationCard } from '@/components/ParticipationCard';
import { TopBar } from '@/components/TopBar';
import { Badge } from '@/components/ui/badge';
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
            <TopBar title="Hello, Guardian" subtitle="Welcome back" />

            <div className="px-6 mt-4">
                <Link href="/quest" className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime/10 text-lime-dark rounded-full text-xs font-medium hover:bg-lime/20 transition-colors">
                    <span>3 badges to reach Steward</span>
                    <ArrowRight size={12} />
                </Link>
            </div>

            <div className="px-6 mt-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 text-xs font-medium text-muted-foreground border border-zinc-200">
                    <MapPin size={12} />
                    Your location: <span className="text-foreground font-semibold">{city}</span>
                </div>
            </div>

            {/* "Your Upcoming" Section */}
            <div className="px-6 mb-8 mt-4">
                <h2 className="text-lg font-bold text-foreground mb-4">Your Upcoming</h2>
                {/* Horizontal Scroll / or Single Hero Card */}
                {/* Request: "Add ONE featured block/card that looks like a hero card ... width: 40vw ... height: 50vh" */}
                {/* For a single item, we just render it. Let's pick a mock item. */}
                {/* Let's use 'p1' (Beach Cleanup) or similar as a Featured Item since we don't have auth/user logic */}
                {(() => {
                    const featuredItem = PARTICIPATION_ITEMS.find(p => p.id === 'p1') || PARTICIPATION_ITEMS[0];
                    return (
                        <Link href={`/p/${featuredItem.id}`} className="block relative h-[50vh] w-[70vw] sm:w-[50vw] max-w-sm rounded-2xl overflow-hidden shadow-md group">
                            <img
                                src={featuredItem.imageUrl || '/images/event-local-action-1.jpg'}
                                alt={featuredItem.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                                <div className="absolute top-4 left-4">
                                    <div className="bg-white/90 backdrop-blur-md text-black px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm uppercase tracking-wide">
                                        {featuredItem.type}
                                    </div>
                                </div>

                                <h3 className="text-white font-bold text-xl leading-tight mb-1 drop-shadow-sm line-clamp-2">
                                    {featuredItem.title}
                                </h3>
                                <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
                                    <span>{new Date(featuredItem.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                    <span>•</span>
                                    <span>{featuredItem.city}</span>
                                </div>
                            </div>
                        </Link>
                    );
                })()}
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
        </div>
    );
}
