import {
  Title,
  ActionIcon,
  Group,
  Badge,
  Input,
  Loader,
  Center,
  Text,
  Paper,
} from '@mantine/core';
import {
  Filter,
  FileDownload,
  Search,
  Plus,
  Trash,
  Check,
} from 'tabler-icons-react';
import { Link } from 'react-router-dom';

import Table from '../../components/Table';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CONTRACTS = gql`
  # Query goes here
  query Query {
    contractsForGrid {
      _id
      isActif
      souscripteur {
        fullName
        nss
      }
      produit {
        nom
      }
      dateCreation
    }
  }
`;
const Subscription = () => {
  let navigate = useNavigate();
  const HeaderTemplate = () => (
    <tr>
      <td>Nom & Prénom</td>
      <td>N° Sécurité Sociale</td>
      <td>Date d'effet</td>
      <td>Produit</td>
      <td>Statut</td>
    </tr>
  );
  const RowTemplate = ({ row }) => (
    <tr onClick={(e) => navigate(`/subscription/${row.id}`)}>
      <td>{row.souscripteur.fullName}</td>
      <td>{row.souscripteur.nss}</td>
      <td>{row.dateCreation}</td>
      <td>{row.produit.nom}</td>
      <td>{row.isActif ? 'Actif' : 'Inactif'}</td>
      <td>
        <Group>
          <ActionIcon
            size={35}
            variant="filled"
            color="blue"
            onClick={(e) => {}}
          >
            <Check size={20} />
          </ActionIcon>
          <ActionIcon size={35} color="red" variant="filled" onClick={() => {}}>
            <Trash size={20} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  );
  const { loading, error, data } = useQuery(CONTRACTS);
  useEffect(() => {
    console.log(data);
  });

  return (
    <>
      <div>
        <Group
          sx={{ height: '100%', alignItems: 'flex-end' }}
          pb={15}
          position="apart"
        >
          <Group>
            <Title
              sx={(theme) => ({
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.blue[4]
                    : theme.colors.blue[6],
              })}
              order={2}
            >
              List des Souscriptions
            </Title>
            <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              {data?.contractsForGrid.length} Souscriptions
            </Badge>
          </Group>
          <Group sx={{ gap: 7 }}>
            <Input
              icon={<Search size={20} />}
              placeholder="Recherche..."
              rightSectionWidth={70}
              styles={{
                rightSection: { pointerEvents: 'none' },
                borderColor: '#1864AB',
              }}
            />
            <ActionIcon size={35} variant="outline" color="blue">
              <Filter size={20} />
            </ActionIcon>
            <ActionIcon size={35} variant="outline" color="blue">
              <FileDownload size={20} />
            </ActionIcon>
            <Link to="/subscription/add">
              <ActionIcon size={35} variant="filled" color="blue">
                <Plus size={20} />
              </ActionIcon>
            </Link>
          </Group>
        </Group>
      </div>
      {loading ? (
        <Center style={{ width: '100%', height: 300 }}>
          <Loader size="lg" variant="bars" />
        </Center>
      ) : error ? (
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
      ) : (
        <Table
          HeaderTemplate={HeaderTemplate}
          RowTemplate={RowTemplate}
          data={data?.contractsForGrid}
        />
      )}
    </>
  );
};

export default Subscription;
