'use client';

import { TopBar } from '@/components/TopBar';
import { Card } from '@/components/ui/card';
import { BADGES, MOCK_USER_BADGES, PARTICIPATION_ITEMS } from '@/lib/data';
import { BadgeIcon } from '@/components/BadgeIcon';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function QuestPage() {
    const earnedCount = MOCK_USER_BADGES.length;

    return (
        <div className="pb-6">
            <TopBar title="My Quest" subtitle="Your journey" />

            <div className="px-6 mt-6 mb-6">
                {/* City Ranking Card */}
                <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm text-center mb-6">
                    <h2 className="text-zinc-500 font-medium text-sm mb-3 uppercase tracking-wide">City Ranking</h2>
                    <div className="space-y-1">
                        <div className="text-zinc-800">
                            Cape Town has earned <span className="text-3xl font-bold text-zinc-900">1,255</span> badges
                        </div>
                        <div className="text-zinc-600 font-medium">
                            Current rank: <span className="text-xl font-bold text-lime-dark">12th</span> globally
                        </div>
                    </div>
                </div>

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

            {/* Past Contributions Slider */}
            <div className="px-6 mt-8 mb-8">
                <h3 className="font-bold text-lg mb-4 text-foreground">Your past contributions</h3>
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
