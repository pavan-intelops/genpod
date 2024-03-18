import {
  IconNotes,
  IconCalendarStats,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  TablerIconsProps
} from '@tabler/icons-react';
import { ArchDiagramIcon } from 'src/assets/icons/ArchDiagram.icon';

export const sideNavData: SideNavData = [
  {
    label: 'Arch Diagrams',
    icon: props => {
      return <ArchDiagramIcon style={{ width: 20, height: 20 }} {...props} />;
    }
  },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' }
    ]
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' }
    ]
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' }
    ]
  }
];

export type SideNavData = {
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}[];
