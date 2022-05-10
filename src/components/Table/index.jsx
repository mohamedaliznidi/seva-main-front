import React, { useState } from 'react';
import { createStyles, Table, ScrollArea } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default function CustomTable({ data, HeaderTemplate, RowTemplate }) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  return (
    <ScrollArea
      sx={{ height: 'calc(100vh - 100px)' }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table highlightOnHover sx={{ minWidth: 700 }} verticalSpacing="md">
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <HeaderTemplate />
        </thead>
        <tbody>
          {data.map((r) => (
            <RowTemplate row={r} />
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
