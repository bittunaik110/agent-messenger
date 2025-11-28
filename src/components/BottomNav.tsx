import { MessageCircle, Phone, Settings } from 'lucide-react';
import { TabType } from '@/types/messenger';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'chats' as TabType, icon: MessageCircle, label: 'Chats' },
    { id: 'calls' as TabType, icon: Phone, label: 'Calls' },
    { id: 'settings' as TabType, icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around h-14">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              'flex flex-col items-center justify-center w-full h-full gap-0.5 transition-colors',
              activeTab === id ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Icon className="w-6 h-6" strokeWidth={activeTab === id ? 2.5 : 2} />
            <span className="text-2xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
