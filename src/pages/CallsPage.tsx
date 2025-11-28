import { Phone, Video, PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react';
import { mockCalls, mockUsers } from '@/data/mockData';
import { useCall } from '@/contexts/CallContext';
import CallListItem from '@/components/CallListItem';
import { toast } from 'sonner';

const CallsPage = () => {
  const { startCall, simulateIncomingCall } = useCall();

  const handleQuickCall = async (type: 'voice' | 'video') => {
    // Demo: Start a call with the first mock user
    const participant = mockUsers[0];
    try {
      toast.info(`Starting ${type} call with ${participant.name}...`);
      await startCall(participant, type);
    } catch (error) {
      console.error('Failed to start call:', error);
      toast.error('Failed to start call. Please check your permissions.');
    }
  };

  const handleSimulateIncoming = () => {
    const participant = mockUsers[1];
    simulateIncomingCall(participant, Math.random() > 0.5 ? 'video' : 'voice');
    toast.info('Simulating incoming call...');
  };

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

      {/* Quick Call Actions (Demo) */}
      <div className="px-4 py-4 space-y-3">
        <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Quick Actions (Demo)</p>
        
        <div className="flex gap-3">
          <button
            onClick={() => handleQuickCall('voice')}
            className="flex-1 flex items-center justify-center gap-2 h-12 bg-green-500 text-white rounded-2xl font-semibold active:scale-95 transition-transform"
          >
            <Phone className="w-5 h-5" />
            Voice Call
          </button>
          <button
            onClick={() => handleQuickCall('video')}
            className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground rounded-2xl font-semibold active:scale-95 transition-transform"
          >
            <Video className="w-5 h-5" />
            Video Call
          </button>
        </div>

        <button
          onClick={handleSimulateIncoming}
          className="w-full flex items-center justify-center gap-2 h-12 bg-secondary text-secondary-foreground rounded-2xl font-semibold active:scale-95 transition-transform"
        >
          <PhoneIncoming className="w-5 h-5" />
          Simulate Incoming Call
        </button>
      </div>

      {/* Call History */}
      <div className="px-4 pt-2">
        <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Recent</p>
      </div>

      <div className="flex-1">
        {mockCalls.length > 0 ? (
          mockCalls.map((call) => (
            <CallListItem
              key={call.id}
              call={call}
              onClick={() => handleQuickCall(call.type)}
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
