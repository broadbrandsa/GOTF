'use client';

import { TopBar } from '@/components/TopBar';
import { Card } from '@/components/ui/card';
import { BADGES, MOCK_USER_BADGES, PARTICIPATION_ITEMS } from '@/lib/data';
import { BadgeIcon } from '@/components/BadgeIcon';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function QuestPage() {
    const earnedCount = MOCK_USER_BADGES.length;

    return (
        <div className="pb-6">
            <TopBar title="My Quest" subtitle="Your journey" />

            <div className="px-6 mt-6 mb-6">
                {/* Metric Row (Redesigned) */}
                <div className="flex items-center justify-between py-2 px-2">
                    {/* Rank */}
                    <div className="flex-1 text-center border-r border-white/20">
                        <div className="text-xs font-light text-white/70 mb-1">City Rank</div>
                        <div className="text-xl font-bold text-white">12th</div>
                    </div>

                    {/* City Badges */}
                    <div className="flex-1 text-center border-r border-white/20">
                        <div className="text-xs font-light text-white/70 mb-1">City Badges</div>
                        <div className="text-xl font-bold text-white">1,255</div>
                    </div>

                    {/* Your Badges */}
                    <div className="flex-1 text-center">
                        <div className="text-xs font-light text-white/70 mb-1">Your Badges</div>
                        <div className="text-xl font-bold text-white">7</div>
                    </div>
                </div>

                <Card className="bg-lime p-6 text-foreground shadow-sm border-0 relative overflow-hidden">
                    <h2 className="text-2xl font-bold mb-2 relative z-10">Almost there!</h2>
                    <p className="font-medium opacity-80 relative z-10 mb-6">
                        You need 3 more badges to reach <span className="font-bold underline">Steward</span>.
                    </p>

                    {/* Milestone Progress Strip */}
                    <div className="relative w-full h-12 flex items-center justify-between px-1 z-10">
                        {/* Line */}
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-black/10 rounded-full"></div>

                        {/* Dots */}
                        {['Volunteer', 'Guardian', 'Steward', 'GOF'].map((tier, i) => {
                            const isCompleted = i <= 1; // Current tier is Guardian (index 1)
                            const isCurrent = i === 1;
                            return (
                                <div key={tier} className="relative flex flex-col items-center group">
                                    <div className={clsx(
                                        "w-3 h-3 rounded-full border-2 transition-colors z-10",
                                        isCompleted ? "bg-zinc-900 border-zinc-900" : "bg-white/50 border-transparent",
                                        isCurrent && "ring-4 ring-white/30"
                                    )}></div>
                                    {isCurrent && (
                                        <div className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider opacity-60">
                                            {tier}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
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

            {/* Past Contributions Slider */}
            <div className="px-6 mt-8 mb-8">
                <h3 className="font-bold text-lg mb-4 text-white">Your past contributions</h3>
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
                    {PARTICIPATION_ITEMS.filter(item => item.status === 'closed').slice(0, 4).map(item => (
                        <div key={item.id} className="snap-center shrink-0 w-[40vw] sm:w-[160px] flex-none">
                            <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-sm bg-zinc-900 active:scale-[0.98] transition-transform">
                                {/* Background Image */}
                                <img
                                    src={item.imageUrl || '/images/event-local-action-1.jpg'}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none"></div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-between p-4">
                                    {/* Badge Pill (Top Left) */}
                                    {item.earnedBadgeName && (
                                        <div className="self-start inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/20 shadow-sm">
                                            <span className="text-xs">🏆</span>
                                            <span className="text-[10px] font-bold text-white leading-none">You earned a {item.earnedBadgeName} badge</span>
                                        </div>
                                    )}

                                    {/* Bottom Text */}
                                    <div className="mt-auto">
                                        <h4 className="font-bold text-sm leading-tight text-white mb-2 line-clamp-2 drop-shadow-sm">
                                            {item.title}
                                        </h4>
                                        <Link href={`/p/${item.id}`} className="text-xs font-semibold text-lime-400 hover:text-lime-300 hover:underline flex items-center">
                                            See the outcome <ArrowRight size={12} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
