import { ChevronLeft, Phone, Video } from 'lucide-react';
import { User } from '@/types/messenger';
import Avatar from './Avatar';

interface ChatHeaderProps {
  participant: User;
  onBack: () => void;
  onCall: (type: 'voice' | 'video') => void;
}

const ChatHeader = ({ participant, onBack, onCall }: ChatHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border safe-top">
      <div className="flex items-center gap-2 h-14 px-2">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-primary active:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        <Avatar src={participant.avatar} alt={participant.name} size="sm" isOnline={participant.isOnline} />

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold truncate">{participant.name}</h2>
          <p className="text-xs text-muted-foreground">
            {participant.isOnline ? 'Active now' : 'Messenger'}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onCall('voice')}
            className="p-2.5 text-primary active:opacity-70 transition-opacity"
          >
            <Phone className="w-6 h-6" />
          </button>
          <button
            onClick={() => onCall('video')}
            className="p-2.5 text-primary active:opacity-70 transition-opacity"
          >
            <Video className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
