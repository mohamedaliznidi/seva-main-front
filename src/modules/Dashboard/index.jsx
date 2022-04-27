import React from 'react';
import {
  createStyles,
  Progress,
  Box,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
} from '@mantine/core';
import {
  ArrowUpRight,
  ArrowDownRight,
  DeviceAnalytics,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.md,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: '3px solid',
    paddingBottom: 5,
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  diff: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}));

const data1 = [
  { title: 'Revenue', value: '$13,456', diff: 34 },
  { title: 'Profit', value: '$4,145', diff: -13 },
  { title: 'Coupons usage', value: '745', diff: 18 },
  { title: 'Coupons usage', value: '745', diff: -30 },
];

const data2 = {
  total: '345,765',
  diff: 18,
  data: [
    { label: 'Mobile', count: '204,001', part: 59, color: '#47d6ab' },
    { label: 'Desktop', count: '121,017', part: 35, color: '#03141a' },
    { label: 'Tablet', count: '31,118', part: 6, color: '#4fcdf7' },
  ],
};

function StatsSegments({ total, diff, data }) {
  const { classes } = useStyles();

  const segments = data.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : null,
  }));

  const descriptions = data.map((stat) => (
    <Box
      key={stat.label}
      sx={{ borderBottomColor: stat.color }}
      className={classes.stat}
    >
      <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
        {stat.label}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text weight={700}>{stat.count}</Text>
        <Text
          color={stat.color}
          weight={700}
          size="sm"
          className={classes.statCount}
        >
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <div className={classes.root}>
      <Paper withBorder p="md" radius="md">
        <Group position="apart">
          <Group align="flex-end" spacing="xs">
            <Text size="xl" weight={700}>
              {total}
            </Text>
            <Text color="teal" className={classes.diff} size="sm" weight={700}>
              <span>{diff}%</span>
              <ArrowUpRight size={16} style={{ marginBottom: 4 }} />
            </Text>
          </Group>
          <DeviceAnalytics size={20} className={classes.icon} />
        </Group>

        <Text color="dimmed" size="sm">
          Page views compared to previous month
        </Text>

        <Progress
          sections={segments}
          size={34}
          classNames={{ label: classes.progressLabel }}
          mt={40}
        />
        <SimpleGrid
          cols={3}
          breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
          mt="xl"
        >
          {descriptions}
        </SimpleGrid>
      </Paper>
    </div>
  );
}

function StatsGridIcons({ data }) {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Text weight={700} size="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} />
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={stat.diff > 0 ? 'teal' : 'red'}
            weight={700}
          >
            {stat.diff}%
          </Text>{' '}
          {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <StatsGridIcons data={data1} />
      <StatsSegments total={data2.total} diff={data2.diff} data={data2.data} />
    </>
  );
}

export default Dashboard;
