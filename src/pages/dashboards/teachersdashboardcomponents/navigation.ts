import {
    HomeIcon,
    ChatBubbleLeftIcon,
    ClipboardDocumentListIcon,
    VideoCameraIcon,
    ChartBarIcon,
    UserIcon
  } from '@heroicons/react/24/outline';
  
  export const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: HomeIcon,
    },
    {
      id: 'discussions',
      label: 'Discussions',
      icon: ChatBubbleLeftIcon,
    },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: ClipboardDocumentListIcon,
    },
    {
      id: 'online-classes',
      label: 'Online Classes',
      icon: VideoCameraIcon,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: ChartBarIcon,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: UserIcon,
    }
  ];