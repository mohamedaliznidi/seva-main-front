import React, { Suspense, useState } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useHotkeys } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Routes from './routes';
import { UserProvider } from './store/userStore';
// import { auth } from './main/store/firebase';
// import { onAuthStateChanged } from 'firebase/auth';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  let navigate = useNavigate();
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  useHotkeys([
    ['ctrl+H', () => navigate('/')],
    ['ctrl+S', () => navigate('/subscription/add')],
    ['ctrl+P', () => navigate('/product/add')],
    ['ctrl+G', () => navigate('/product/garantie-add')],
  ]);
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider theme={{ colorScheme }}>
            <NotificationsProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes />
              </Suspense>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
export default App;
