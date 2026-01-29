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
                        <Button variant="outline" className="rounded-full h-9 px-4 text-sm font-medium border-border justify-between gap-2">
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

            <div className="px-6 space-y-3">
                {MEMBERS.map(member => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
}
