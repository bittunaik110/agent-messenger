import { Message } from '@/types/messenger';
import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isSent: boolean;
  showAvatar?: boolean;
  senderAvatar?: string;
}

const MessageBubble = ({ message, isSent, showAvatar, senderAvatar }: MessageBubbleProps) => {
  const isEmoji = message.type === 'emoji' || (message.text.length <= 2 && /\p{Emoji}/u.test(message.text));

  return (
    <div
      className={cn(
        'flex gap-2 px-4 animate-fade-in',
        isSent ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {!isSent && showAvatar && senderAvatar && (
        <img
          src={senderAvatar}
          alt=""
          className="w-7 h-7 rounded-full object-cover self-end flex-shrink-0"
        />
      )}
      {!isSent && !showAvatar && <div className="w-7" />}

      <div className={cn('max-w-[75%] flex flex-col', isSent ? 'items-end' : 'items-start')}>
        {isEmoji ? (
          <span className="text-5xl leading-tight">{message.text}</span>
        ) : (
          <div className={cn(isSent ? 'message-sent' : 'message-received')}>
            <p className="text-[15px] leading-snug whitespace-pre-wrap break-words">
              {message.text}
            </p>
          </div>
        )}

        {isSent && (
          <div className="mt-0.5 mr-1">
            {message.status === 'read' ? (
              <CheckCheck className="w-3.5 h-3.5 text-primary" />
            ) : message.status === 'delivered' ? (
              <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <Check className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
