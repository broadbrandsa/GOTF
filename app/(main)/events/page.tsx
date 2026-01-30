'use client';

import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { ParticipationCard } from '@/components/ParticipationCard';
import { Button } from '@/components/ui/button';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { Filter, SlidersHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ParticipatePage() {
    const [filterType, setFilterType] = useState<'all' | 'event' | 'challenge'>('all');

    // Filter Logic
    // 1. Status Open
    // 2. Type matches filter (if not all)
    // 3. Exclude 'Learning' category (Webinars) -> because those go to Discover page?
    //    Actually, prompt says unified page lists "Events" and "Research". Discover has "Discover cards".
    //    Usually "Learning" items are webinars/online.
    //    Let's check plan: "Fetch ALL open items (Events + Challenges)."
    //    Discover page: "Fetch category: Learning items".
    //    So Participate page should mostly hide Learning items if they are on Discover? 
    //    Prompt says: "Use /events ... include BOTH: Events, Research items". 
    //    It doesn't explicitly say "Exclude Webinars", but "Discover becomes its own page... showing ALL current Discover cards".
    //    If Discover cards are "Webinars/Learning", then maybe exclude them here?
    //    Let's exclude category 'Learning' from Participate to make clear distinction, 
    //    as "Participate" implies action/research, and "Discover" implies learning.

    const items = PARTICIPATION_ITEMS
        .filter(item => item.status === 'open' && item.category !== 'Learning')
        .filter(item => filterType === 'all' || item.type === filterType)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="pb-6">
            <TopBar title="Participate" subtitle="Join the action" />

            {/* Filters */}
            <div className="px-6 mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <Button
                    variant={filterType === 'all' ? 'default' : 'outline'}
                    size="sm"
                    className={`rounded-full h-8 text-xs ${filterType === 'all' ? 'bg-lime text-zinc-900 border-lime hover:bg-lime-400' : 'bg-white border-zinc-200 text-zinc-600'}`}
                    onClick={() => setFilterType('all')}
                >
                    All
                </Button>
                <Button
                    variant={filterType === 'event' ? 'default' : 'outline'}
                    size="sm"
                    className={`rounded-full h-8 text-xs ${filterType === 'event' ? 'bg-lime text-zinc-900 border-lime hover:bg-lime-400' : 'bg-white border-zinc-200 text-zinc-600'}`}
                    onClick={() => setFilterType('event')}
                >
                    Events
                </Button>
                <Button
                    variant={filterType === 'challenge' ? 'default' : 'outline'}
                    size="sm"
                    className={`rounded-full h-8 text-xs ${filterType === 'challenge' ? 'bg-sky-200 text-sky-900 border-sky-200 hover:bg-sky-300' : 'bg-white border-zinc-200 text-zinc-600'}`}
                    onClick={() => setFilterType('challenge')}
                >
                    Research
                </Button>

                <div className="ml-auto pl-2 border-l border-zinc-200">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white shadow-sm border border-zinc-200">
                                <SlidersHorizontal size={14} className="text-zinc-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Date: Earliest First</DropdownMenuItem>
                            <DropdownMenuItem>Location: Any</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* List */}
            <div className="px-6 mt-4 space-y-4">
                {items.length > 0 ? (
                    items.map(item => (
                        <ParticipationCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        No active items found.
                    </div>
                )}
            </div>
        </div>
    );
}
