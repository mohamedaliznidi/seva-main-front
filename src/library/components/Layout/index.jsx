import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
// import { UserContext } from '../../../App';
import { useUserValue } from '../../../main/store/userStore';
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
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

function Layout() {
  const location = useLocation();
  const { currentUser } = useUserValue();
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return currentUser ? (
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
              image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
              name="Mohamed Ali ZNIDI"
              email="maznidi@iga-tunisie.com"
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
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
  // return (
  //   <AppShell
  //     padding="md"
  //     navbar={
  //       <Navbar
  //         width={{ base: 250 }}
  //         height={'100vh'}
  //         p="xs"
  //         pb={0}
  //         className={classes.navbar}
  //       >
  //         <Navbar.Section className={classes.header}>
  //           <Group position="apart">
  //             <Logo width={120} />
  //             <SwitchToggle />
  //           </Group>
  //         </Navbar.Section>

  //         <Navbar.Section grow className={classes.links} component={ScrollArea}>
  //           <div className={classes.linksInner}>{links}</div>
  //         </Navbar.Section>
  //         <Navbar.Section className={classes.footer}>
  //           <UserButton
  //             image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
  //             name="Mohamed Ali ZNIDI"
  //             email="maznidi@iga-tunisie.com"
  //           />
  //         </Navbar.Section>
  //       </Navbar>
  //     }
  //     styles={(theme) => ({
  //       main: {
  //         backgroundColor:
  //           theme.colorScheme === 'dark'
  //             ? theme.colors.dark[8]
  //             : theme.colors.gray[0],
  //         overflow: 'auto',
  //         height: '100vh',
  //       },
  //     })}
  //   >
  //     <Outlet />
  //   </AppShell>
  // );
}

export default Layout;
