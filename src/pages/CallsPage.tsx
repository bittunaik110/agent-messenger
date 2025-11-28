import { Phone } from 'lucide-react';
import { mockCalls } from '@/data/mockData';
import CallListItem from '@/components/CallListItem';

const CallsPage = () => {
  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background safe-top">
        <div className="flex items-center justify-between px-4 h-14">
          <span className="text-primary font-semibold">Edit</span>
          <h1 className="text-xl font-bold">Calls</h1>
          <button className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center active:opacity-70">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-4 px-4 py-2 border-b border-border">
        <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
          All
        </button>
        <button className="px-4 py-1.5 text-muted-foreground text-sm font-semibold">
          Missed
        </button>
      </div>

      {/* Call List */}
      <div className="flex-1">
        {mockCalls.length > 0 ? (
          mockCalls.map((call) => (
            <CallListItem
              key={call.id}
              call={call}
              onClick={() => console.log('Call:', call.participant.name)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Phone className="w-12 h-12 mb-4 opacity-50" />
            <p>No recent calls</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallsPage;
