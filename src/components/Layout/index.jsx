import { useLocation, useNavigate } from 'react-router';
import { signOut } from 'firebase/auth';
import { auth } from '../..//store/firebase';
import { useUserValue } from '../..//store/userStore';
import {
  AppShell,
  Navbar,
  Group,
  ScrollArea,
  createStyles,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Logo } from './_logo';
import { SwitchToggle } from './_user';
import {
  Notes,
  Gauge,
  PresentationAnalytics,
  FileAnalytics,
  Lock,
} from 'tabler-icons-react';
import { UserButton } from '../UserButton';
import { LinksGroup } from '../NavbarLinksGroup';
import { useEffect } from 'react';

const mockdata = [
  { label: 'Dashboard', icon: Gauge, link: '/', shortCut: 'H' },
  {
    label: 'Souscription',
    icon: Notes,
    link: '/subscription',
    shortCut: 'S',
  },
  {
    label: 'Contrat',
    icon: FileAnalytics,
    link: '/contract',
  },
  {
    label: 'Produits',
    icon: Lock,
    links: [
      { label: 'Produit', link: '/product' },
      { label: 'Garantie', link: '/product/garantie' },
      { label: 'Acte', link: '/product/acte' },
      { label: 'Code Calcule', link: '/product/codec' },
    ],
    shortCut: 'P',
  },
  { label: 'Statistique', icon: PresentationAnalytics, link: '/statistic' },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: 10,
    paddingTop: 0,
    marginLeft: -10,
    marginRight: -10,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -10,
    marginRight: -10,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -10,
    marginRight: -10,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

function Layout() {
  const location = useLocation();
  let navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserValue();
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));
  const logout = () => {
    signOut(auth)
      .then((result) => {
        setCurrentUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!currentUser && localStorage.getItem('token')) {
      setCurrentUser(JSON.parse(localStorage.getItem('user')));
    } else if (!currentUser && !localStorage.getItem('token')) {
      navigate('/login', { replace: true, state: { from: location } });
    }
  });

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ base: 250 }}
          height={'100vh'}
          p="xs"
          pb={0}
          className={classes.navbar}
        >
          <Navbar.Section className={classes.header}>
            <Group position="apart">
              <Logo width={120} />
              <SwitchToggle />
            </Group>
          </Navbar.Section>

          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>{links}</div>
          </Navbar.Section>
          <Navbar.Section className={classes.footer}>
            <UserButton
              image={currentUser?.photoURL || ''}
              name={currentUser?.displayName ? currentUser?.displayName : 'doe'}
              email={currentUser?.email}
              cb={logout}
            />
          </Navbar.Section>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          overflow: 'auto',
          height: '100vh',
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}

export default Layout;
