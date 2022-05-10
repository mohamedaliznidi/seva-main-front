import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
  ActionIcon,
  Menu,
  Divider,
} from '@mantine/core';
import {
  ChevronRight,
  Settings,
  Search,
  ColorSwatch,
  Logout,
  Pencil,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export function UserButton({ image, name, email, icon, cb, ...others }) {
  const { classes } = useStyles();
  return (
    <Menu
      position="right"
      placement="end"
      style={{ width: '100%' }}
      control={
        <UnstyledButton className={classes.user} {...others}>
          <Group spacing="sm">
            <Avatar src={image} radius="xl" />

            <div style={{ flex: 1, maxWidth: 125, width: '100%' }}>
              <Text size="sm" weight={500} style={{ overflow: 'hidden' }}>
                {name}
              </Text>
              <Text color="dimmed" size="xs" style={{ overflow: 'hidden' }}>
                {email}
              </Text>
            </div>
            <ActionIcon>
              <ChevronRight size={16} />
            </ActionIcon>
          </Group>
        </UnstyledButton>
      }
    >
      <Menu.Label>Application</Menu.Label>
      <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
      <Menu.Item icon={<ColorSwatch size={14} />}>Theme</Menu.Item>
      <Menu.Item
        icon={<Search size={14} />}
        rightSection={
          <Text size="xs" color="dimmed">
            ⌘K
          </Text>
        }
      >
        Search
      </Menu.Item>
      <Divider />
      <Menu.Label>Profile</Menu.Label>
      <Menu.Item icon={<Pencil size={14} />}>Update my account</Menu.Item>
      <Menu.Item onClick={() => cb()} color="red" icon={<Logout size={14} />}>
        Logout
      </Menu.Item>
    </Menu>
  );
}
