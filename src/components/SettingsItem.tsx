import { ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsItemProps {
  icon: LucideIcon;
  iconBg: string;
  label: string;
  value?: string;
  onClick?: () => void;
  hasChevron?: boolean;
  children?: React.ReactNode;
}

const SettingsItem = ({ icon: Icon, iconBg, label, value, onClick, hasChevron = true, children }: SettingsItemProps) => {
  const content = (
    <>
      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', iconBg)}>
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="flex-1 font-medium">{label}</span>
      {value && <span className="text-muted-foreground">{value}</span>}
      {children}
      {hasChevron && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="ios-list-item w-full">
        {content}
      </button>
    );
  }

  return <div className="ios-list-item">{content}</div>;
};

export default SettingsItem;
