'use client';

import { TopBar } from '@/components/TopBar';
import { OutcomeCard } from '@/components/OutcomeCard';
import { PARTICIPATION_ITEMS } from '@/lib/data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function OutcomesPage() {
    // Filter: Closed items with outcomes
    const outcomes = PARTICIPATION_ITEMS
        .filter(item => item.status === 'closed' && item.outcomeSummary);

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

                    <TabsContent value="discover" className="mt-8 text-center text-muted-foreground">
                        <p>Check back later for discovery features.</p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
