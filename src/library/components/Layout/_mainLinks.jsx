import React from 'react';
import {
  LayoutGrid,
  Heart,
  ShieldCheck,
  Folder,
  ChartBar,
} from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function MainLink({ icon, color, label, route }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Link to={route} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Text size="sm">{label}</Text>
        </Link>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <LayoutGrid size={16} />,
    color: 'blue',
    label: 'Dashboard',
    route: '/',
  },
  {
    icon: <Heart size={16} />,
    color: 'teal',
    label: 'Souscription',
    route: '/subscription',
  },
  {
    icon: <ShieldCheck size={16} />,
    color: 'violet',
    label: 'Contrat',
    route: '/contract',
  },
  {
    icon: <Folder size={16} />,
    color: 'grape',
    label: 'Produit',
    route: '/product',
  },
  {
    icon: <ChartBar size={16} />,
    color: 'orange',
    label: 'Statistique',
    route: '/statistic',
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
