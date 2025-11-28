import { useState } from 'react';
import { Chat, TabType } from '@/types/messenger';
import BottomNav from '@/components/BottomNav';
import ChatsPage from './ChatsPage';
import CallsPage from './CallsPage';
import SettingsPage from './SettingsPage';
import ChatView from './ChatView';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  // If a chat is selected, show the chat view
  if (selectedChat) {
    return (
      <ChatView
        chat={selectedChat}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {activeTab === 'chats' && (
        <ChatsPage onChatSelect={setSelectedChat} />
      )}
      {activeTab === 'calls' && <CallsPage />}
      {activeTab === 'settings' && <SettingsPage />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
