export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
  status?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'emoji';
  replyTo?: string;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
}

export interface Call {
  id: string;
  participantId: string;
  participant: User;
  type: 'voice' | 'video';
  direction: 'incoming' | 'outgoing';
  status: 'missed' | 'answered' | 'declined';
  duration?: number;
  timestamp: Date;
}

export type TabType = 'chats' | 'calls' | 'settings';
