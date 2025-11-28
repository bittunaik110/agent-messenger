import { Plus } from 'lucide-react';
import { User } from '@/types/messenger';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';

interface StoriesRowProps {
  users: User[];
  currentUserAvatar: string;
}

const StoriesRow = ({ users, currentUserAvatar }: StoriesRowProps) => {
  const onlineUsers = users.filter((u) => u.isOnline);

  return (
    <div className="px-4 py-3">
      <div className="flex gap-4 overflow-x-auto hide-scrollbar">
        {/* Your story */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="relative">
            <img
              src={currentUserAvatar}
              alt="Your story"
              className="w-14 h-14 rounded-full object-cover bg-secondary"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background">
              <Plus className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
            </div>
          </div>
          <span className="text-xs text-muted-foreground">Your story</span>
        </div>

        {/* Online users */}
        {onlineUsers.map((user) => (
          <div key={user.id} className="flex flex-col items-center gap-1 flex-shrink-0">
            <Avatar src={user.avatar} alt={user.name} size="md" isOnline />
            <span className="text-xs text-muted-foreground w-14 text-center truncate">
              {user.name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesRow;
