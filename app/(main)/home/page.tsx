'use client';

import { useState, useEffect } from 'react';
import { ParticipationCard } from '@/components/ParticipationCard';
import { TopBar } from '@/components/TopBar';
import { Badge } from '@/components/ui/Badge';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { Participation } from '@/lib/types';
import { MapPin } from 'lucide-react';

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

            <div className="px-6 mt-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 text-xs font-medium text-muted-foreground border border-zinc-200">
                    <MapPin size={12} />
                    Your location: <span className="text-foreground font-semibold">{city}</span>
                </div>

                <p className="mt-4 text-muted-foreground">
                    Here’s what’s coming up near you.
                </p>
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
