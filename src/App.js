import React, { Suspense, useState, useEffect } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Routes from './main/routes';
import { AuthProvider } from './main/store/userStore';
import { auth } from './main/store/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
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
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider theme={{ colorScheme }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes />
            </Suspense>
          </MantineProvider>
        </ColorSchemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
export default App;
