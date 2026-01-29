'use client';

import { TopBar } from '@/components/TopBar';
import { OutcomeCard } from '@/components/OutcomeCard';
import { PARTICIPATION_ITEMS } from '@/lib/data';

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

                {/* Visual Toggle Tabs */}
                <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-full">
                    <button className="py-2 text-sm font-medium text-muted rounded-full">Discover</button>
                    <button className="py-2 text-sm font-semibold text-foreground bg-white shadow-sm rounded-full">Outcomes</button>
                </div>
            </div>

            <div className="px-6 space-y-4">
                {outcomes.length > 0 ? (
                    outcomes.map(item => (
                        <OutcomeCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="text-center py-10 text-muted">
                        <p>No outcomes reported yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
