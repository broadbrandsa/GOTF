'use client';

import { TopBar } from '@/components/TopBar';
import { OutcomeCard } from '@/components/OutcomeCard';
import { PARTICIPATION_ITEMS } from '@/lib/data';

export default function OutcomesPage() {
    const outcomes = PARTICIPATION_ITEMS
        .filter(item => item.status === 'closed')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="pb-6">
            <TopBar title="Outcomes" subtitle="Impact Report" />

            <div className="px-6 mt-6 space-y-4">
                {outcomes.length > 0 ? (
                    outcomes.map(item => (
                        <OutcomeCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        No outcomes reported yet.
                    </div>
                )}
            </div>
        </div>
    );
}
