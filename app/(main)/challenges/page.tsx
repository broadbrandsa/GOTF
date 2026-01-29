'use client';

import { ParticipationCard } from '@/components/ParticipationCard';
import { TopBar } from '@/components/TopBar';
import { PARTICIPATION_ITEMS, CITIES } from '@/lib/data';
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ChallengesPage() {
    const challenges = PARTICIPATION_ITEMS
        .filter(item => item.type === 'challenge')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const categories = ['All Categories', 'Citizen Science', 'Local Action', 'Learning'];

    return (
        <div className="pb-6">
            <TopBar title="Challenges" subtitle="Take action" />

            <div className="px-6 mt-2 mb-6 space-y-4">
                <p className="text-muted-foreground">
                    Small actions, shared momentum.
                </p>

                <div className="flex gap-3 overflow-x-auto pb-1 -mx-6 px-6 scrollbar-hide">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="rounded-full h-9 px-4 text-sm font-medium border-border bg-white shadow-sm hover:bg-zinc-50 whitespace-nowrap gap-2">
                                All Categories
                                <ChevronDown size={14} className="text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {categories.map(c => <DropdownMenuItem key={c}>{c}</DropdownMenuItem>)}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="rounded-full h-9 px-4 text-sm font-medium border-border bg-white shadow-sm hover:bg-zinc-50 whitespace-nowrap gap-2">
                                Cape Town
                                <ChevronDown size={14} className="text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {CITIES.map(c => <DropdownMenuItem key={c}>{c}</DropdownMenuItem>)}
                        </DropdownMenuContent>
                    </DropdownMenu>
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
