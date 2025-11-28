import { Phone, PhoneIncoming, PhoneMissed, PhoneOutgoing, Video } from 'lucide-react';
import { Call } from '@/types/messenger';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';

interface CallListItemProps {
  call: Call;
  onClick: () => void;
}

const CallListItem = ({ call, onClick }: CallListItemProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeString = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const CallIcon = call.status === 'missed' ? PhoneMissed : call.direction === 'incoming' ? PhoneIncoming : PhoneOutgoing;

  return (
    <div className="ios-list-item w-full text-left">
      <Avatar
        src={call.participant.avatar}
        alt={call.participant.name}
        size="md"
        isOnline={call.participant.isOnline}
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{call.participant.name}</h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <CallIcon
            className={cn(
              'w-4 h-4',
              call.status === 'missed' ? 'text-destructive' : 'text-muted-foreground'
            )}
          />
          <span className={cn(
            'text-sm',
            call.status === 'missed' ? 'text-destructive' : 'text-muted-foreground'
          )}>
            {call.status === 'missed' ? 'Missed' : call.direction === 'incoming' ? 'Incoming' : 'Outgoing'}
            {call.duration && ` · ${formatDuration(call.duration)}`}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {getTimeString(call.timestamp)}
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="p-2 text-primary active:opacity-70"
        >
          {call.type === 'video' ? (
            <Video className="w-5 h-5" />
          ) : (
            <Phone className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CallListItem;
