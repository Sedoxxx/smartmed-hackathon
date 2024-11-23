import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';

export function UserButton() {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src=""
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Dr john Doe
          </Text>

          <Text c="dimmed" size="xs">
            Johndoe@outlook.com
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
