import { useState, useEffect } from 'react';
import { Title, ActionIcon, Group, Badge, Input } from '@mantine/core';
import { Filter, FileDownload, Search, Plus } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Table from '../../components/Table';
import source from '../../resources/seed/produit.json';
import { useNavigate } from 'react-router-dom';

const Garantie = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('https://localhost:44319/api/Garantie/GetAll')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let navigate = useNavigate();
  const HeaderTemplate = () => (
    <tr>
      <td>Nom Produit</td>
      <td>Libelle Commercialle</td>
      <td>Date d'effet</td>
      <td>Enseigne</td>
      <td>Gestion Prestation</td>
      <td>Gestion Cotisation</td>
    </tr>
  );
  const RowTemplate = ({ row }) => (
    <tr onClick={(e) => navigate(`/garantie/${row.id}`)}>
      <td>{row.libelle}</td>
      <td>{row.libelleCommercial}</td>
      <td>{row.dateEffet.split('T')[0]}</td>
      <td>{row.enseigne}</td>
      <td>{row.gestionPrestation ? 'OUI' : 'NON'}</td>
      <td>{row.gestionCotisation ? 'OUI' : 'NON'}</td>
    </tr>
  );
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
              List des Garanties
            </Title>
            <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              {data.length} Garanties
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
            <Link to="/product/garantie-add">
              <ActionIcon size={35} variant="filled" color="blue">
                <Plus size={20} />
              </ActionIcon>
            </Link>
          </Group>
        </Group>
      </div>
      <Table
        HeaderTemplate={HeaderTemplate}
        RowTemplate={RowTemplate}
        data={data}
      />
    </>
  );
};

export default Garantie;
