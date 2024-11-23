'use client'
import { IconChevronDown } from '@tabler/icons-react';
import { Burger, Center, Container, Group, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LocaleSwitcher } from './LocaleSwitcher'
import Image from 'next/image';
import { useLocale } from 'next-intl';
import {useRouter} from '@/i18n/routing';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderMenu.module.css';

const links = [
  { link: '/dashboard/card', label: 'Doctor Dashboard' },
  // {
  //   link: '#1',
  //   label: 'Learn',
  //   links: [
  //     { link: '/docs', label: 'Documentation' },
  //     { link: '/resources', label: 'Resources' },
  //     { link: '/community', label: 'Community' },
  //     { link: '/blog', label: 'Blog' },
  //   ],
  // },
  { link: '/dashboard/appointment', label: 'appointments' },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' }
  ,
  {
    link: '#2',
    label: 'Support',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];

export function HeaderMenu() {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const locale = useLocale();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              style={{cursor: 'pointer'}}
              // href={link.link}
              className={classes.link}
              onClick={() => {router.push(link.link);}}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        // href={link.link}
        style={{cursor: 'pointer'}}
        className={classes.link}
        onClick={() => {router.push(link.link);}}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          {/* <MantineLogo size={28} /> */}
          <Image src="/logo.svg" style={{cursor: 'pointer'}} onClick={() => {router.push('/quiz');}} alt="logo" width={120} height={100}/>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <LocaleSwitcher />
          {/* <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" /> */}
        </div>
      </Container>
    </header>
  );
}
