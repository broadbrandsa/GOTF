'use client';

import { ParticipationCard } from '@/components/ParticipationCard';
import { TopBar } from '@/components/TopBar';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { ChevronDown } from 'lucide-react';

export default function ChallengesPage() {
    // Filter: Challenges
    const challenges = PARTICIPATION_ITEMS
        .filter(item => item.type === 'challenge')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="pb-6">
            <TopBar title="Challenges" subtitle="Take action" />

            <div className="px-6 mt-2 mb-6 space-y-4">
                <p className="text-muted-foreground">
                    Small actions, shared momentum.
                </p>

                <div className="flex gap-3 overflow-x-auto pb-1 -mx-6 px-6 scrollbar-hide">
                    {/* Visual Filters */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium shadow-sm whitespace-nowrap">
                        <span>All Categories</span>
                        <ChevronDown size={14} className="text-muted" />
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium shadow-sm whitespace-nowrap">
                        <span>Cape Town</span>
                        <ChevronDown size={14} className="text-muted" />
                    </div>
                </div>
            </div>

            <div className="px-6 space-y-4">
                {challenges.map(item => (
                    <ParticipationCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
