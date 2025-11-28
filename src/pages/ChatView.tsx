import { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '@/types/messenger';
import { mockMessages } from '@/data/mockData';
import { useCall } from '@/contexts/CallContext';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import MessageInput from '@/components/MessageInput';
import Avatar from '@/components/Avatar';
import { toast } from 'sonner';

interface ChatViewProps {
  chat: Chat;
  onBack: () => void;
}

const ChatView = ({ chat, onBack }: ChatViewProps) => {
  const participant = chat.participants[0];
  const [messages, setMessages] = useState<Message[]>(mockMessages[chat.id] || []);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { startCall } = useCall();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      text,
      timestamp: new Date(),
      status: 'sent',
      type: text.length <= 2 && /\p{Emoji}/u.test(text) ? 'emoji' : 'text',
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: 'delivered' as const } : m))
      );
    }, 1000);
  };

  const handleCall = async (type: 'voice' | 'video') => {
    try {
      toast.info(`Starting ${type} call with ${participant.name}...`);
      await startCall(participant, type);
    } catch (error) {
      console.error('Failed to start call:', error);
      toast.error('Failed to start call. Please check your microphone/camera permissions.');
    }
  };

  // Group messages for avatar display
  const shouldShowAvatar = (index: number) => {
    if (messages[index].senderId === 'current-user') return false;
    if (index === messages.length - 1) return true;
    return messages[index + 1].senderId !== messages[index].senderId;
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader
        participant={participant}
        onBack={onBack}
        onCall={handleCall}
      />

      {/* Chat intro */}
      <div className="flex flex-col items-center py-8 px-4">
        <Avatar src={participant.avatar} alt={participant.name} size="xl" isOnline={participant.isOnline} />
        <h2 className="text-xl font-bold mt-3">{participant.name}</h2>
        <p className="text-muted-foreground text-sm">Messenger</p>
        <div className="flex items-center gap-2 mt-4">
          <Avatar src={participant.avatar} alt="" size="sm" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Say hi to {participant.name.split(' ')[0]}!
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 pb-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isSent={message.senderId === 'current-user'}
            showAvatar={shouldShowAvatar(index)}
            senderAvatar={participant.avatar}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatView;
