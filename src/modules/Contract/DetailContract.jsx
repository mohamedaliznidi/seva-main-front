import { useState } from 'react';
import {
  Divider,
  Header,
  Group,
  ActionIcon,
  Title,
  Drawer,
  Tabs,
  Container,
  Stack,
  Paper,
  ScrollArea,
  Grid,
  Anchor,
  SimpleGrid,
  TextInput,
  NativeSelect,
  Select,
  Textarea,
  Button,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Bell, MessageCircle } from 'tabler-icons-react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Comment from '../../components/Comment';
import QueryResult from '../../components/QueryResult';

const tabs = [
  { name: 'Général', link: '' },
  { name: 'Produits', link: '/products' },
  { name: 'Cotisations', link: '/cotisations' },
  { name: 'Documents', link: '/documents' },
];

export const GET_CONTRACT = gql`
  query Query($id: ID!) {
    contract(_id: $id) {
      souscripteur {
        nss
        dateNais
        mobile
        email
      }
      dateCreation
      dateModification
      dateValidation
      produit {
        id
        nom
        description
      }
      cotisation {
        modePayement
        frequencePayement
        montant
        jourAppel
        tiers
      }
      dateCloture
      userCreator {
        nom
        email
      }
      userModifier {
        nom
        email
      }
      _id
    }
  }
`;
function DetailContract() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_CONTRACT, {
    variables: { id },
  });

  const items = tabs.map((tab) => <Tabs.Tab label={tab.name} key={tab.name} />);
  const [activeTab, setActiveTab] = useState(0);
  const [openedNotif, setOpenedNotif] = useState(false);
  const [openedDiscu, setOpenedDiscu] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <Header
        height={64}
        style={{
          position: 'absolute',
          width: 'calc(100vw - 250px)',
          top: -16,
          left: -16,
        }}
      >
        <Group sx={{ height: 64 }} px={20} position="apart">
          <Title
            sx={(theme) => ({
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.blue[4]
                  : theme.colors.blue[7],
            })}
            order={3}
          >
            Details Contract
          </Title>
          <Group>
            <ActionIcon
              color="blue"
              variant="outline"
              size={30}
              onClick={() => setOpenedDiscu(true)}
            >
              <MessageCircle size={16} />
            </ActionIcon>
            <DiscuDrawer opened={openedDiscu} setOpened={setOpenedDiscu} />
            <ActionIcon
              variant="outline"
              size={30}
              onClick={() => setOpenedNotif(true)}
            >
              <Bell size={16} />
            </ActionIcon>
            <NotifDrawer opened={openedNotif} setOpened={setOpenedNotif} />
          </Group>
        </Group>
        <Divider
          my="sm"
          variant="dashed"
          style={{ marginTop: 0, marginBottom: 10 }}
        />
        <Container fluid></Container>
      </Header>
      <Grid
        style={{
          paddingTop: 64,
          height: 'calc(100vh - 80px)',
        }}
        columns={7}
      >
        <Grid.Col span={1}>
          <Tabs
            orientation="vertical"
            sx={(theme) => ({
              '&.mantine-Tabs-root': { height: '100%' },
              '	.mantine-Tabs-tabsListWrapper': { width: '100%' },
              '.mantine-Tabs-tabControl': { transition: 'all 1.5s ease' },
              '.mantine-Tabs-tabInner': {
                maxWidth: '25ch',
                overflow: 'hidden',
              },
              '.mantine-Tabs-tabActive': {
                background:
                  theme.colorScheme === 'dark'
                    ? theme.colors.blue[9]
                    : theme.colors.blue[1],
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.blue[1]
                    : theme.colors.blue[8],
                fontWeight: 500,
                marginLeft: '-16px',
                transition: 'all .5s ease',
              },
            })}
            active={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
            }}
          >
            {items}
          </Tabs>
        </Grid.Col>
        <Grid.Col span={6}>
          <ScrollArea>
            {activeTab === 0 && (
              <QueryResult error={error} loading={loading} data={data}>
                <ContractGeneral contract={data?.contract} />
              </QueryResult>
            )}
            {activeTab === 1 && (
              <QueryResult error={error} loading={loading} data={data}>
                <ContractProducts produit={data.contract.produit} />
              </QueryResult>
            )}
            {activeTab === 2 && (
              <QueryResult error={error} loading={loading} data={data}>
                <ContractCotisation cotisation={data.contract.cotisation} />
              </QueryResult>
            )}
            {/* <QueryResult error={error} loading={loading} data={data}>
              {activeTab === 0 && <ContractGeneral contract={data.contract} />}
              {activeTab === 1 && (
                <ContractProducts produit={data.contract.produit} />
              )}
              {activeTab === 2 && (
                <ContractCotisation cotisation={data.contract.contisation} />
              )}
            </QueryResult> */}
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </div>
  );
}

const ContractGeneral = ({ contract }) => {
  const [FirstFormUpdate, setFirstFormUpdate] = useState(true);
  const [SecondFormUpdate, setSecondFormUpdate] = useState(true);
  return (
    <Stack
      justify="flex-start"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        width: '100%',
      })}
    >
      <Paper shadow="sm" radius="md" p="md">
        <Group position="apart">
          <Title
            sx={(theme) => ({
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.blue[4]
                  : theme.colors.blue[6],
            })}
            order={4}
          >
            Identité du contrat
          </Title>
          <Anchor
            size="sm"
            color="dimmed"
            onClick={() => setFirstFormUpdate(!FirstFormUpdate)}
          >
            Update
          </Anchor>
        </Group>
        <SimpleGrid cols={4} mt="md">
          <TextInput
            label="N°Contrat"
            required
            value={contract._id}
            disabled={true} //{FirstFormUpdate}
          />
          <DatePicker
            label="dateCloture"
            value={
              new Date(
                contract.dateCloture.split('-')[0],
                contract.dateCloture.split('-')[1],
                contract.dateCloture.split('-')[2]
              )
            }
            required
            disabled={FirstFormUpdate}
          />
          <DatePicker
            label="dateCreation"
            value={
              new Date(
                contract.dateCreation.split('-')[0],
                contract.dateCreation.split('-')[1],
                contract.dateCreation.split('-')[2]
              )
            }
            required
            disabled={true} //{FirstFormUpdate}
          />
          <DatePicker
            label="dateModification"
            value={
              new Date(
                contract.dateModification.split('-')[0],
                contract.dateModification.split('-')[1],
                contract.dateModification.split('-')[2]
              )
            }
            disabled={true} //{FirstFormUpdate}
          />
          <DatePicker
            label="dateValidation"
            value={
              new Date(
                contract.dateValidation.split('-')[0],
                contract.dateValidation.split('-')[1],
                contract.dateValidation.split('-')[2]
              )
            }
            required
            disabled={true} //{FirstFormUpdate}
          />
          <TextInput
            label="userCreator"
            value={contract.userCreator.email}
            disabled={true} //{FirstFormUpdate}
          />
          <TextInput
            label="userModifier"
            value={contract.userModifier.email}
            disabled={true} //{FirstFormUpdate}
          />
        </SimpleGrid>
      </Paper>
      <Paper shadow="sm" radius="md" p="md">
        <Group position="apart">
          <Title
            sx={(theme) => ({
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.blue[4]
                  : theme.colors.blue[6],
            })}
            order={4}
          >
            Souscripteur
          </Title>
          <Anchor
            size="sm"
            color="dimmed"
            onClick={() => setSecondFormUpdate(!SecondFormUpdate)}
          >
            Update
          </Anchor>
        </Group>
        <SimpleGrid cols={4} my="md">
          <TextInput
            value={contract.souscripteur.nss}
            label="N°SS"
            disabled={SecondFormUpdate}
          />
          <DatePicker
            label="date de naissance"
            value={
              new Date(
                contract.souscripteur.dateNais.split('-')[0],
                contract.souscripteur.dateNais.split('-')[1],
                contract.souscripteur.dateNais.split('-')[2]
              )
            }
            required
            disabled={SecondFormUpdate}
          />
          <TextInput
            type="number"
            placeholder="000"
            label="Mobile"
            rightSection={
              <NativeSelect
                disabled={SecondFormUpdate}
                data={['+33', '+44', '+55', '+66']}
                styles={{
                  input: {
                    fontWeight: 500,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  },
                }}
              />
            }
            rightSectionWidth={70}
            disabled={SecondFormUpdate}
          />
          <TextInput
            value={contract.souscripteur.email}
            label="Email"
            disabled={SecondFormUpdate}
          />
        </SimpleGrid>
        {SecondFormUpdate ? null : (
          <Button
            style={{ float: 'right' }}
            onClick={() => setSecondFormUpdate(true)}
          >
            Save
          </Button>
        )}
      </Paper>
    </Stack>
  );
};

const ContractProducts = ({ produit }) => {
  return (
    <Stack
      justify="flex-start"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        width: '100%',
      })}
    >
      <Paper shadow="sm" radius="md" p="md">
        <Group position="apart">
          <Title
            sx={(theme) => ({
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.blue[4]
                  : theme.colors.blue[6],
            })}
            order={4}
          >
            Produit
          </Title>
          <Anchor size="sm" color="dimmed"></Anchor>
        </Group>
        <SimpleGrid cols={2} my="md">
          <TextInput
            label="ID Produit"
            required
            value={produit.id}
            disabled={true} //{FirstFormUpdate}
          />
          <TextInput
            label="Nom Produit"
            value={produit.nom}
            disabled={true} //{FirstFormUpdate}
          />
        </SimpleGrid>
        <Textarea
          label="Description"
          disabled={true}
          value={produit.description}
        ></Textarea>
      </Paper>
    </Stack>
  );
};

const ContractCotisation = ({ cotisation }) => {
  const [cotisationFormUpdate, setCotisationFormUpdate] = useState(true);
  return (
    <Stack
      justify="flex-start"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        width: '100%',
      })}
    >
      <Paper shadow="sm" radius="md" p="md">
        <Group position="apart">
          <Title
            sx={(theme) => ({
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.blue[4]
                  : theme.colors.blue[6],
            })}
            order={4}
          >
            Produit
          </Title>
          <Anchor
            size="sm"
            color="dimmed"
            onClick={() => setCotisationFormUpdate(!cotisationFormUpdate)}
          >
            {cotisationFormUpdate ? 'Update' : 'Cancel'}
          </Anchor>
        </Group>
        <SimpleGrid cols={2} my="md">
          <Select
            label="Mode de paiement"
            placeholder="Espèce"
            data={[
              { value: 'Espèce', label: 'Espèce' },
              { value: 'Chèque', label: 'Chèque' },
              { value: 'Carte bancaire', label: 'Carte bancaire' },
            ]}
            searchable
            clearable
            value={cotisation.modePayement}
            disabled={cotisationFormUpdate}
          />
          <Select
            label="Fréquence de paiement"
            placeholder="Mensuel"
            data={[
              { value: 'Mensuel', label: 'Mensuel' },
              { value: 'Trimestriel', label: 'Trimestriel' },
              { value: 'Semestriel', label: 'Semestriel' },
            ]}
            searchable
            clearable
            value={cotisation.frequencePayement}
            disabled={cotisationFormUpdate}
          />
          <Select
            label="Jour d'appel"
            placeholder="Lundi"
            data={[
              { value: 'Lundi', label: 'Lundi' },
              { value: 'Mardi', label: 'Mardi' },
              { value: 'Mercredi', label: 'Mercredi' },
              { value: 'Jeudi', label: 'Jeudi' },
              { value: 'Vendredi', label: 'Vendredi' },
              { value: 'Samedi', label: 'Samedi' },
              { value: 'Dimanche', label: 'Dimanche' },
            ]}
            searchable
            clearable
            value={cotisation.jourAppel}
            disabled={cotisationFormUpdate}
          />
          <TextInput
            label="Montant"
            value={cotisation.montant}
            disabled={cotisationFormUpdate}
          />
        </SimpleGrid>
        {cotisationFormUpdate ? null : (
          <Button
            style={{ float: 'right' }}
            onClick={() => setCotisationFormUpdate(true)}
          >
            Save
          </Button>
        )}
      </Paper>
    </Stack>
  );
};

const NotifDrawer = ({ opened, setOpened }) => (
  <Drawer
    opened={opened}
    onClose={() => setOpened(false)}
    position="right"
    title="Notifications"
    padding="xl"
    size="lg"
  >
    Notif drawer
  </Drawer>
);

const DiscuDrawer = ({ opened, setOpened }) => (
  <Drawer
    opened={opened}
    onClose={() => setOpened(false)}
    position="right"
    title={<Title order={3}>Comments</Title>}
    padding="xl"
    size="xl"
  >
    {Array(15)
      .fill({
        postedAt: '10 minutes ago',
        body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
        author: {
          name: 'Jacob Warnhalter',
          image:
            'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
        },
      })
      .map((c) => (
        <Comment {...c} />
      ))}
  </Drawer>
);

export default DetailContract;
