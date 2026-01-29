'use client';

import { ParticipationCard } from '@/components/ParticipationCard';
import { TopBar } from '@/components/TopBar';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { Button } from '@/components/ui/Button'; // For dropdown trigger
import { ChevronDown } from 'lucide-react';

export default function EventsPage() {
    // Filter: Events + Webinars
    // Sort by date
    const events = PARTICIPATION_ITEMS
        .filter(item => item.type === 'event' || item.type === 'webinar')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="pb-6">
            <TopBar title="Events" subtitle="Join something real" />

            <div className="px-6 mt-2 mb-6">
                <p className="text-muted-foreground mb-4">
                    Join something real, in-person or online.
                </p>

                {/* Visual Dropdown */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium shadow-sm">
                    <span>Cape Town</span>
                    <ChevronDown size={14} className="text-muted" />
                </div>
            </div>

            <div className="px-6 space-y-4">
                {events.map(item => (
                    <ParticipationCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
