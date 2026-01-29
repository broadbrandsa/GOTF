'use client';

import { TopBar } from '@/components/TopBar';
import { OutcomeCard } from '@/components/OutcomeCard';
import { ParticipationCard } from '@/components/ParticipationCard';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function OutcomesPage() {
    // Outcomes: Closed items with outcomes
    const outcomes = PARTICIPATION_ITEMS
        .filter(item => item.status === 'closed' && item.outcomeSummary)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent closed first

    // Discover: Learning items or Online items
    const discoverItems = PARTICIPATION_ITEMS
        .filter(item => item.category === 'Learning' || item.mode === 'online')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Soonest first

    return (
        <div className="pb-6">
            <TopBar title="Outcomes" subtitle="Impact" />

            <div className="px-6 mt-2 mb-6 space-y-4">
                <p className="text-muted-foreground">
                    What your actions make possible.
                </p>

                <Tabs defaultValue="outcomes" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 rounded-full p-1 bg-zinc-100 h-11">
                        <TabsTrigger value="discover" className="rounded-full text-xs uppercase tracking-wide">Discover</TabsTrigger>
                        <TabsTrigger value="outcomes" className="rounded-full text-xs uppercase tracking-wide">Outcomes</TabsTrigger>
                    </TabsList>

                    {/* Outcomes Tab */}
                    <TabsContent value="outcomes" className="mt-6 space-y-4">
                        {outcomes.length > 0 ? (
                            outcomes.map(item => (
                                <OutcomeCard key={item.id} item={item} />
                            ))
                        ) : (
                            <div className="text-center py-10 text-muted-foreground">
                                <p>No outcomes reported yet.</p>
                            </div>
                        )}
                    </TabsContent>

                    {/* Discover Tab */}
                    <TabsContent value="discover" className="mt-6 space-y-4">
                        <p className="text-sm text-muted-foreground mb-2 px-1">Expand your knowledge with these sessions.</p>
                        {discoverItems.length > 0 ? (
                            discoverItems.map(item => (
                                <ParticipationCard key={item.id} item={item} />
                            ))
                        ) : (
                            <div className="text-center py-10 text-muted-foreground">
                                <p>No discovery items available.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
