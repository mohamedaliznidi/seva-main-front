import React from 'react';
import { Title, Loader, Center, Text, Paper } from '@mantine/core';

function QueryResult({ loading, error, data, children }) {
  if (error) {
    return (
      <Center style={{ width: '100%', height: 200 }}>
        <Paper shadow="xs" p="md">
          <Title
            sx={(theme) => ({
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.blue[4]
                  : theme.colors.blue[6],
            })}
            order={3}
          >
            Oops!!!
          </Title>
          <Text>${error.message}</Text>
        </Paper>
      </Center>
    );
  }
  if (loading) {
    return (
      <Center style={{ width: '100%', height: 300 }}>
        <Loader size="lg" variant="bars" />
      </Center>
    );
  }
  if (!data) {
    return (
      <Center style={{ width: '100%', height: 200 }}>
        <Paper shadow="xs" p="md">
          <Title
            sx={(theme) => ({
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.blue[4]
                  : theme.colors.blue[6],
            })}
            order={3}
          >
            No Data
          </Title>
        </Paper>
      </Center>
    );
  }
  if (data) {
    return children;
  }
}

export default QueryResult;
