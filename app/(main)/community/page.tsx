'use client';

import { TopBar } from '@/components/TopBar';
import { MemberCard } from '@/components/MemberCard';
import { MEMBERS, CITIES } from '@/lib/data';
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
    return (
        <div className="pb-6">
            <TopBar title="Community" subtitle="Local Guardians" />

            <div className="px-6 mt-2 mb-6">
                <p className="text-muted-foreground mb-4">
                    People taking action near you.
                </p>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-full h-9 px-4 text-sm font-medium bg-white border border-zinc-200 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 justify-between gap-2 min-w-[140px]">
                            <span className="flex items-center gap-2">
                                <span className="text-lime-dark">📍</span> Cape Town
                            </span>
                            <ChevronDown size={14} className="text-muted-foreground opacity-50" />
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

            <div className="px-6 space-y-3">
                {MEMBERS.map(member => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
}
