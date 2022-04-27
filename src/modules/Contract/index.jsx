import { Title, ActionIcon, Group, Badge, Input } from '@mantine/core';
import { Filter, FileDownload, Search } from 'tabler-icons-react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Table from '../../library/components/Table';
import QueryResult from '../../library/components/QueryResult';

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

const Conract = () => {
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
    <tr onClick={(e) => navigate(`/contract/${row._id}`)}>
      <td>{row.souscripteur.fullName}</td>
      <td>{row.souscripteur.nss}</td>
      <td>{row.dateCreation}</td>
      <td>{row.produit.nom}</td>
      <td>{row.isActif ? 'Actif' : 'Inactif'}</td>
    </tr>
  );
  const { loading, error, data } = useQuery(CONTRACTS);
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
              List des Contrats
            </Title>
            <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              {data && data?.contractsForGrid.length} Contrats
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
          </Group>
        </Group>
      </div>
      <QueryResult loading={loading} error={error} data={data}>
        <Table
          HeaderTemplate={HeaderTemplate}
          RowTemplate={RowTemplate}
          data={data?.contractsForGrid}
        />
      </QueryResult>
    </>
  );
};

export default Conract;
