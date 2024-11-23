import React from 'react';
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from '@tabler/icons-react';
import { Code, Group, ScrollArea } from '@mantine/core';
import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from './UserButton/UserButton';
import { Logo } from './Logo';
import classes from './NavbarNested.module.css';

const mockdata = [
  { label: 'Appointments', icon: IconGauge },
  {
    label: 'Statistics',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  // {
  //   label: 'Releases',
  //   icon: IconCalendarStats,
  //   links: [
  //     { label: 'Upcoming releases', link: '/' },
  //     { label: 'Previous releases', link: '/' },
  //     { label: 'Releases schedule', link: '/' },
  //   ],
  // },
  // { label: 'Analytics', icon: IconPresentationAnalytics },
  // { label: 'Contracts', icon: IconFileAnalytics },
  ,
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

export function NavbarNested({ isCollapsed }) {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={`${classes.navbar} ${isCollapsed ? classes.collapsed : ''}`}>
      <div className={classes.header}>
        <Group justify="space-between">
          {/* <Logo style={{ width: 120 }} /> */}
          {/* {!isCollapsed && <Code fw={700}>v3.1.2</Code>} */}
        </Group>
      </div>

      {!isCollapsed && (
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
      )}

      {!isCollapsed && (
        <div className={classes.footer}>
          <UserButton />
        </div>
      )}
    </nav>
  );
}
