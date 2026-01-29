'use client';

import { ParticipationCard } from '@/components/ParticipationCard';
import { TopBar } from '@/components/TopBar';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { CITIES } from '@/lib/data';
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
    // Filter: Events + Webinars
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

                {/* Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-full h-9 px-4 text-sm font-medium border-border hover:bg-zinc-50 hover:text-foreground justify-between gap-2">
                            Cape Town
                            <ChevronDown size={14} className="text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {CITIES.map(city => (
                            <DropdownMenuItem key={city}>
                                {city}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="px-6 space-y-4">
                {events.map(item => (
                    <ParticipationCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
