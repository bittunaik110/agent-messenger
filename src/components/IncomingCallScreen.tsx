import { Phone, PhoneOff, Video } from 'lucide-react';
import { User } from '@/types/messenger';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';

interface IncomingCallScreenProps {
  participant: User;
  callType: 'voice' | 'video';
  onAnswer: () => void;
  onDecline: () => void;
}

const IncomingCallScreen = ({ participant, callType, onAnswer, onDecline }: IncomingCallScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col items-center justify-between py-16 safe-top safe-bottom animate-fade-in">
      {/* Top section - Caller info */}
      <div className="flex flex-col items-center text-center px-6">
        <div className="relative">
          <Avatar src={participant.avatar} alt={participant.name} size="xl" />
          <div className="absolute -inset-4 border-4 border-primary/30 rounded-full animate-pulse" />
          <div className="absolute -inset-8 border-2 border-primary/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <h1 className="text-2xl font-bold text-white mt-8">{participant.name}</h1>
        <p className="text-lg text-gray-400 mt-2">
          Incoming {callType === 'video' ? 'Video' : 'Voice'} Call...
        </p>
      </div>

      {/* Middle section - Animation */}
      <div className="flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom section - Call controls */}
      <div className="flex items-center justify-center gap-16">
        {/* Decline */}
        <button
          onClick={onDecline}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-lg shadow-destructive/30">
            <PhoneOff className="w-7 h-7 text-white" />
          </div>
          <span className="text-sm text-gray-400">Decline</span>
        </button>

        {/* Answer */}
        <button
          onClick={onAnswer}
          className="flex flex-col items-center gap-2 group"
        >
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-lg",
            callType === 'video' ? "bg-primary shadow-primary/30" : "bg-green-500 shadow-green-500/30"
          )}>
            {callType === 'video' ? (
              <Video className="w-7 h-7 text-white" />
            ) : (
              <Phone className="w-7 h-7 text-white" />
            )}
          </div>
          <span className="text-sm text-gray-400">Accept</span>
        </button>
      </div>
    </div>
  );
};

export default IncomingCallScreen;
