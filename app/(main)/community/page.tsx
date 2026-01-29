'use client';

import { TopBar } from '@/components/TopBar';
import { MemberCard } from '@/components/MemberCard';
import { MEMBERS } from '@/lib/data';
import { ChevronDown } from 'lucide-react';

export default function CommunityPage() {
    return (
        <div className="pb-6">
            <TopBar title="Community" subtitle="Local Guardians" />

            <div className="px-6 mt-2 mb-6">
                <p className="text-muted-foreground mb-4">
                    People taking action near you.
                </p>

                {/* Visual Dropdown */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium shadow-sm">
                    <span>Cape Town</span>
                    <ChevronDown size={14} className="text-muted" />
                </div>
            </div>

            <div className="px-6 space-y-3">
                {MEMBERS.map(member => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
}
