import { Check, CheckCheck } from 'lucide-react';
import { Chat } from '@/types/messenger';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ChatListItemProps {
  chat: Chat;
  onClick: () => void;
}

const ChatListItem = ({ chat, onClick }: ChatListItemProps) => {
  const participant = chat.participants[0];
  const lastMessage = chat.lastMessage;
  const isSent = lastMessage?.senderId === 'current-user';

  const getTimeString = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <button
      onClick={onClick}
      className="ios-list-item w-full text-left"
    >
      <Avatar
        src={participant.avatar}
        alt={participant.name}
        size="md"
        isOnline={participant.isOnline}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className={cn(
            'font-semibold truncate',
            chat.unreadCount > 0 ? 'text-foreground' : 'text-foreground'
          )}>
            {participant.name}
          </h3>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {lastMessage && getTimeString(lastMessage.timestamp)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-0.5">
          {isSent && lastMessage && (
            <span className="flex-shrink-0">
              {lastMessage.status === 'read' ? (
                <CheckCheck className="w-4 h-4 text-primary" />
              ) : (
                <Check className="w-4 h-4 text-muted-foreground" />
              )}
            </span>
          )}
          <p className={cn(
            'text-sm truncate',
            chat.unreadCount > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'
          )}>
            {isSent && 'You: '}{lastMessage?.text}
          </p>
        </div>
      </div>

      {chat.unreadCount > 0 && (
        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-primary-foreground">
            {chat.unreadCount}
          </span>
        </div>
      )}
    </button>
  );
};

export default ChatListItem;
