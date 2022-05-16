import { NavigationItem } from './types';

const defaultNavigationItems: NavigationItem[] = [
  { key: 'Home', href: '/mock', children: 'Home', isCurrentPage: true },
  { key: 'Title1', href: '/mock', children: 'Title1' },
  { key: 'Title2', href: '/mock', children: 'Title2' },
];

export { defaultNavigationItems };
