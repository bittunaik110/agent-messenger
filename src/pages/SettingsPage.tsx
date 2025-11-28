import { Moon, Bell, Users, MessageCircle, AtSign, Phone, Lock, HelpCircle } from 'lucide-react';
import { currentUser } from '@/data/mockData';
import Avatar from '@/components/Avatar';
import SettingsItem from '@/components/SettingsItem';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeStatus, setActiveStatus] = useState(true);

  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background safe-top">
        <div className="flex items-center justify-end px-4 h-14">
          <span className="text-primary font-semibold">Done</span>
        </div>
      </header>

      {/* Profile Section */}
      <div className="flex flex-col items-center py-6">
        <div className="relative">
          <Avatar src={currentUser.avatar} alt={currentUser.name} size="xl" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-background">
            <MessageCircle className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-4">{currentUser.name}</h2>
      </div>

      {/* Settings Groups */}
      <div className="px-4 space-y-6">
        {/* Preferences */}
        <div className="ios-card overflow-hidden">
          <SettingsItem
            icon={Moon}
            iconBg="bg-foreground"
            label="Dark Mode"
            hasChevron={false}
          >
            <Switch
              checked={darkMode}
              onCheckedChange={(checked) => {
                setDarkMode(checked);
                document.documentElement.classList.toggle('dark', checked);
              }}
            />
          </SettingsItem>

          <div className="h-px bg-border ml-14" />

          <SettingsItem
            icon={MessageCircle}
            iconBg="bg-green-500"
            label="Active Status"
            value={activeStatus ? 'On' : 'Off'}
            hasChevron={false}
          >
            <Switch
              checked={activeStatus}
              onCheckedChange={setActiveStatus}
            />
          </SettingsItem>
        </div>

        {/* Account */}
        <div className="ios-card overflow-hidden">
          <SettingsItem
            icon={AtSign}
            iconBg="bg-red-500"
            label="Username"
            value="@jacob_west"
          />

          <div className="h-px bg-border ml-14" />

          <SettingsItem
            icon={Phone}
            iconBg="bg-primary"
            label="Phone"
            value="+1 202 555 0147"
          />
        </div>

        {/* Preferences Section */}
        <div>
          <p className="text-xs text-muted-foreground uppercase font-semibold px-4 mb-2">
            Preferences
          </p>
          <div className="ios-card overflow-hidden">
            <SettingsItem
              icon={Bell}
              iconBg="bg-purple-500"
              label="Notifications & Sounds"
            />

            <div className="h-px bg-border ml-14" />

            <SettingsItem
              icon={Users}
              iconBg="bg-primary"
              label="People"
            />

            <div className="h-px bg-border ml-14" />

            <SettingsItem
              icon={Lock}
              iconBg="bg-amber-500"
              label="Privacy & Security"
            />

            <div className="h-px bg-border ml-14" />

            <SettingsItem
              icon={HelpCircle}
              iconBg="bg-teal-500"
              label="Help & Support"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
