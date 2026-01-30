import { PARTICIPATION_ITEMS } from '@/lib/data';
import { ParticipationCard } from '@/components/ParticipationCard';
import { TopBar } from '@/components/TopBar';
import { Badge } from '@/components/ui/badge'; // Types needed for local mock if strict, but we can coerce or just use the same shape.

// We will define DISCOVER_ITEMS locally as requested, but to keep types clean we'll match Participation interface.
// Or we can import the ones we added to lib/data in the previous step if they are already there.
// The prompt said "Recreate the Discover items as a local constant... OR in the shared mock data file."
// I already saw them in lib/data.ts (p9, p10). I will stick to using them from lib/data.ts if they exist, or define locally if simpler.
// Actually, looking at the previous view_file of lib/data.ts, p9 and p10 are there!
// p9: Rewilding Cities
// p10: Cape Town Water Stories
// I need "Urban Farming (Online)". p3 in data.ts is "Urban Farming 101".
// So I can just filter PARTICIPATION_ITEMS for category 'Learning' which usually maps to Discover content in this app's logic (based on previous files).
// Wait, the prompt lists specific items.
// "Urban Farming (Online)" -> p3
// "Rewilding Cities..." -> p9
// "Cape Town Water Stories..." -> p10
// "plus any other Discover cards we added earlier".
// So filtering by category 'Learning' seems the robust way if the data is already in `lib/data.ts`.
// Let's verify `lib/data.ts` again to be sure categories align.
// p3: Learning
// p9: Learning
// p10: Learning
// p14: Learning (Webinar)
// So filtering by `category === 'Learning'` should work perfectly.

export default function DiscoverPage() {
    // Filter for Learning items which represent Discover content
    // Also include 'open' status primarily, or all if we want to show closed too?
    // Prompt says "Recreate the Discover items...". Let's show all Learning items.
    const items = PARTICIPATION_ITEMS.filter(item => item.category === 'Learning');

    return (
        <div className="pb-24">
            <TopBar title="Discover" subtitle="Learn & Grow" />

            <div className="px-6 mt-6 space-y-4">
                {items.length > 0 ? (
                    items.map(item => (
                        <ParticipationCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="text-center py-12 text-white/50">
                        Check back soon for new learning opportunities.
                    </div>
                )}
            </div>
        </div>
    );
}
