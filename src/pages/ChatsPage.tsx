import { useState } from 'react';
import { Camera, Edit } from 'lucide-react';
import { Chat } from '@/types/messenger';
import { mockChats, mockUsers, currentUser } from '@/data/mockData';
import SearchBar from '@/components/SearchBar';
import StoriesRow from '@/components/StoriesRow';
import ChatListItem from '@/components/ChatListItem';
import Avatar from '@/components/Avatar';

interface ChatsPageProps {
  onChatSelect: (chat: Chat) => void;
}

const ChatsPage = ({ onChatSelect }: ChatsPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter((chat) => {
    const participant = chat.participants[0];
    return participant.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background safe-top">
        <div className="flex items-center justify-between px-4 h-14">
          <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
          <h1 className="text-2xl font-bold">Chats</h1>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center active:opacity-70">
              <Camera className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center active:opacity-70">
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Search */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Stories/Online Users */}
      <StoriesRow users={mockUsers} currentUserAvatar={currentUser.avatar} />

      {/* Chat List */}
      <div className="flex-1">
        {filteredChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            onClick={() => onChatSelect(chat)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatsPage;
