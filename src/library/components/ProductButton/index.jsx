import React from 'react';
import {
  UnstyledButton,
  Group,
  Text,
  createStyles,
  Paper,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',

    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export function ProductButton({ produit, courtier, about, ...others }) {
  const { classes } = useStyles();
  return (
    <UnstyledButton className={classes.user} {...others}>
      <Paper shadow="sm" radius="md" p="md">
        <div style={{}}>
          <Group>
            <Text size="xl" weight={500}>
              {produit}
            </Text>

            <Text color="dimmed" size="sm">
              {courtier}
            </Text>
          </Group>
          <Text size="sm">{about}</Text>
        </div>
      </Paper>
    </UnstyledButton>
  );
}
