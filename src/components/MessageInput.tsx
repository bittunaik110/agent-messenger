import { useState } from 'react';
import { Camera, Image, Mic, Send, Smile, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState('');
  const hasText = text.trim().length > 0;

  const handleSend = () => {
    if (hasText) {
      onSend(text.trim());
      setText('');
    } else {
      onSend('👍');
    }
  };

  return (
    <div className="sticky bottom-0 bg-background border-t border-border safe-bottom">
      <div className="flex items-end gap-2 p-2">
        <div className="flex items-center gap-1">
          <button className="p-2 text-primary active:opacity-70">
            <Camera className="w-6 h-6" />
          </button>
          <button className="p-2 text-primary active:opacity-70">
            <Image className="w-6 h-6" />
          </button>
          <button className="p-2 text-primary active:opacity-70">
            <Mic className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex items-end gap-2 bg-secondary rounded-3xl px-4 py-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Aa"
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-[15px] min-h-[24px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button className="text-primary active:opacity-70 flex-shrink-0">
            <Smile className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={handleSend}
          className={cn(
            'p-2 transition-colors active:opacity-70',
            hasText ? 'text-primary' : 'text-primary'
          )}
        >
          {hasText ? (
            <Send className="w-6 h-6" />
          ) : (
            <ThumbsUp className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
