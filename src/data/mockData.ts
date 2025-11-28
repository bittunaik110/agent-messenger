import { User, Chat, Message, Call } from '@/types/messenger';

export const currentUser: User = {
  id: 'current-user',
  name: 'Jacob West',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  isOnline: true,
  status: 'Available',
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Martha Craig',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Martin Randolph',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Andrew Parker',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000),
  },
  {
    id: '4',
    name: 'Karen Castillo',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
  },
  {
    id: '5',
    name: 'Maisy Humphrey',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    lastSeen: new Date(Date.now() - 86400000),
  },
  {
    id: '6',
    name: 'Joshua Lawrence',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
  },
];

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    participants: [mockUsers[0]],
    lastMessage: {
      id: 'msg-1',
      senderId: mockUsers[0].id,
      text: 'How are you doing?',
      timestamp: new Date(Date.now() - 180000),
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    isPinned: true,
    isGroup: false,
  },
  {
    id: 'chat-2',
    participants: [mockUsers[1]],
    lastMessage: {
      id: 'msg-2',
      senderId: 'current-user',
      text: "What's man!",
      timestamp: new Date(Date.now() - 3600000),
      status: 'delivered',
      type: 'text',
    },
    unreadCount: 0,
    isPinned: false,
    isGroup: false,
  },
  {
    id: 'chat-3',
    participants: [mockUsers[2]],
    lastMessage: {
      id: 'msg-3',
      senderId: 'current-user',
      text: 'Ok, thanks!',
      timestamp: new Date(Date.now() - 7200000),
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    isPinned: false,
    isGroup: false,
  },
  {
    id: 'chat-4',
    participants: [mockUsers[3]],
    lastMessage: {
      id: 'msg-4',
      senderId: 'current-user',
      text: 'Ok, See you in Tokyo!',
      timestamp: new Date(Date.now() - 172800000),
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    isPinned: false,
    isGroup: false,
  },
  {
    id: 'chat-5',
    participants: [mockUsers[4]],
    lastMessage: {
      id: 'msg-5',
      senderId: mockUsers[4].id,
      text: 'Have a good day, Maisy!',
      timestamp: new Date(Date.now() - 172800000),
      status: 'read',
      type: 'text',
    },
    unreadCount: 2,
    isPinned: false,
    isGroup: false,
  },
  {
    id: 'chat-6',
    participants: [mockUsers[5]],
    lastMessage: {
      id: 'msg-6',
      senderId: mockUsers[5].id,
      text: 'The business plan looks great!',
      timestamp: new Date(Date.now() - 259200000),
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    isPinned: false,
    isGroup: false,
  },
];

export const mockMessages: Record<string, Message[]> = {
  'chat-1': [
    {
      id: 'm1',
      senderId: mockUsers[0].id,
      text: 'Hello, Jacob!',
      timestamp: new Date(Date.now() - 600000),
      status: 'read',
      type: 'text',
    },
    {
      id: 'm2',
      senderId: mockUsers[0].id,
      text: 'How are you doing?',
      timestamp: new Date(Date.now() - 180000),
      status: 'read',
      type: 'text',
    },
    {
      id: 'm3',
      senderId: 'current-user',
      text: '👋',
      timestamp: new Date(Date.now() - 120000),
      status: 'read',
      type: 'emoji',
    },
  ],
};

export const mockCalls: Call[] = [
  {
    id: 'call-1',
    participantId: mockUsers[0].id,
    participant: mockUsers[0],
    type: 'video',
    direction: 'outgoing',
    status: 'answered',
    duration: 1823,
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: 'call-2',
    participantId: mockUsers[1].id,
    participant: mockUsers[1],
    type: 'voice',
    direction: 'incoming',
    status: 'missed',
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: 'call-3',
    participantId: mockUsers[2].id,
    participant: mockUsers[2],
    type: 'voice',
    direction: 'outgoing',
    status: 'answered',
    duration: 342,
    timestamp: new Date(Date.now() - 86400000),
  },
];
