import React from 'react';
import { IconAdjustments, IconCalendarStats, IconFileAnalytics, IconGauge, IconLock, IconNotes, IconPresentationAnalytics } from '@tabler/icons-react';
import { Group, ScrollArea } from '@mantine/core';
import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from './UserButton/UserButton';
import { Logo } from './Logo';
import { NavLink } from 'react-router-dom'; // Import NavLink for routing
import classes from './NavbarNested.module.css';

const mockdata = [
  {
    label: 'Appointments',
    icon: IconGauge,
    link: '/appointments', // Appointments link to the appointments page
  },
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
  // Map the mock data to LinksGroup components
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

      {/* Render the navigation links if not collapsed */}
      {!isCollapsed && (
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            {links}
          </div>
        </ScrollArea>
      )}

      {/* Render the user button if not collapsed */}
      {!isCollapsed && (
        <div className={classes.footer}>
          <UserButton />
        </div>
      )}
    </nav>
  );
}
