'use client';

import { TopBar } from '@/components/TopBar';
import { Card } from '@/components/ui/Card';
import { BADGES, MOCK_USER_BADGES } from '@/lib/data';
import { BadgeIcon } from '@/components/BadgeIcon';

export default function QuestPage() {
    const earnedCount = MOCK_USER_BADGES.length;
    // Next tier is Steward (requires 8? - Example said 7/10, need 3 more for Steward?)
    // Prompt: "User has 7 badges out of 10... You need 3 more badges to reach Steward."
    // Wait, if badges are 10 total. 7+3 = 10. Does Steward require 10?
    // Tiers: Volunteer, Guardian, Steward, GOF.
    // I will just hardcode the message as requested.

    return (
        <div className="pb-6">
            <TopBar title="My Quest" subtitle="Your journey" />

            <div className="px-6 mt-6 mb-8">
                <Card className="bg-gradient-to-br from-lime-dark to-lime p-6 text-foreground shadow-lg border-0">
                    <h2 className="text-2xl font-bold mb-2">Almost there!</h2>
                    <p className="font-medium opacity-80">
                        You need 3 more badges to reach <span className="font-bold underline">Steward</span>.
                    </p>
                    <div className="mt-4 w-full bg-white/30 h-3 rounded-full overflow-hidden backdrop-blur-sm">
                        <div className="bg-foreground h-full rounded-full w-[70%]"></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs font-semibold opacity-60">
                        <span>Guardian</span>
                        <span>Steward</span>
                    </div>
                </Card>
            </div>

            <div className="px-6">
                <h3 className="text-lg font-semibold mb-6">Badges</h3>
                <div className="grid grid-cols-3 gap-y-8 gap-x-4">
                    {BADGES.map(badge => (
                        <BadgeIcon
                            key={badge.id}
                            badge={badge}
                            isUnlocked={MOCK_USER_BADGES.includes(badge.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
