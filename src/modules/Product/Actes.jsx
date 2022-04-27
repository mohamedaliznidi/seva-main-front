import React, { useState, useEffect } from 'react';
import Service from '../../Services/Index';
import {
  Accordion,
  Title,
  ActionIcon,
  Group,
  Badge,
  Input,
  Grid,
  Modal,
  Switch,
  TextInput,
  Select,
  MultiSelect,
  InputWrapper,
  Button,
} from '@mantine/core';
import axios from 'axios';
import Table from '../../library/components/Table';
import { Filter, FileDownload, Search, Plus } from 'tabler-icons-react';

const dataTest = [
  {
    id: '1',
    libelle: 'famille1',
    actes: [
      { id: '5', libelle: 'Acte 2-1' },
      { id: '6', libelle: 'Acte 2-2' },
      { id: '7', libelle: 'Acte 2--3' },
      { id: '8', libelle: 'Acte 2--4' },
    ],
    acteFamille: null,
    acteFamilles: [
      {
        id: '2',
        libelle: 'famille1--1',
        actes: [
          { id: '3', libelle: 'acte1--1--1' },
          { id: '4', libelle: 'acte1--1--2' },
          { id: '5', libelle: 'acte1--1--3' },
          { id: '6', libelle: 'acte1--1--4' },
        ],
        acteFamille: null,
        acteFamilles: null,
      },
      {
        id: '3',
        libelle: 'famille1--2',
        actes: [
          { id: '7', libelle: 'acte1--2--1' },
          { id: '8', libelle: 'acte1--2--2' },
          { id: '9', libelle: 'acte1--2--3' },
        ],
        acteFamille: null,
        acteFamilles: null,
      },
    ],
  },

  {
    id: '4',
    libelle: 'famille2',
    actes: [
      { id: '5', libelle: 'Acte 2--1' },
      { id: '6', libelle: 'Acte 2--2' },
      { id: '7', libelle: 'Acte 2--3' },
      { id: '8', libelle: 'Acte 2--4' },
    ],
    acteFamille: null,
    acteFamilles: null,
  },
];

function Acte() {
  const [opened, setOpened] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('https://localhost:44319/api/ActeFamille/GetHierarchy')
      .then((response) => {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [opened]);

  return (
    <div className="product-list">
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
              List des Actes
            </Title>
            <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              Actes
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
            <ActionIcon
              size={35}
              variant="filled"
              color="blue"
              onClick={() => setOpened(true)}
            >
              <Plus size={20} />
            </ActionIcon>
          </Group>
        </Group>
      </div>
      <div>
        <Accordion initialItem={0}>
          {data.map((item) => makeAccordionItems(item, (e) => setOpened(e)))}
        </Accordion>
      </div>

      <ActesPopup
        opened={opened}
        onClose={() => setOpened(false)}
        setOpened={setOpened}
      />
    </div>
  );
}

var makeAccordionItems = (x, handleClick) => {
  const HeaderTemplate = () => (
    <tr>
      <td>Id Acte</td>
      <td>Libelle Commercialle</td>
    </tr>
  );
  const RowTemplate = ({ row }) => (
    <tr onClick={(e) => handleClick(true)}>
      <td>{row.id}</td>
      <td>{row.libelle}</td>
    </tr>
  );
  return (
    <Accordion.Item label={x.libelle} key={x.id}>
      {x.acteFamilles ? (
        <Accordion>
          {x.acteFamilles.map((item, index) =>
            makeAccordionItems(item, index, handleClick)
          )}
        </Accordion>
      ) : (
        ''
      )}
      {x.actes ? (
        <div
          className={'table-acte'}
          id={x.libelle}
          style={{
            height: 30 + x.actes.length * 55,
            paddingTop: '10px',
            overflow: 'hidden',
          }}
        >
          <Table
            HeaderTemplate={HeaderTemplate}
            RowTemplate={RowTemplate}
            data={x.actes}
          />
        </div>
      ) : (
        ''
      )}
    </Accordion.Item>
  );
};

function ActesPopup({ data, ...props }) {
  const [isActe, setIsActe] = useState(true);

  const [libelle, setLibelle] = useState('');
  const [Famille, setFamille] = useState(0);
  const [familleSource, setFamilleSource] = useState([]);

  useEffect(() => {
    Service.Get('https://localhost:44319/api/ActeFamille/GetAll').then(
      (response) => {
        setFamilleSource(response);
        console.log(familleSource);
      }
    );
  }, []);

  return (
    <Modal
      centered
      size="55%"
      {...props}
      title={
        <Title
          sx={(theme) => ({
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.gray[4]
                : theme.colors.gray[7],
          })}
          order={4}
        >
          {isActe ? 'Ajout Acte' : 'Ajout Famille Acte'}
        </Title>
      }
    >
      <Grid>
        <Grid.Col span={3}>
          <InputWrapper label="Acte">
            <Switch
              checked={isActe}
              onChange={(event) => {
                setIsActe(event.currentTarget.checked);
                setLibelle('');
                setFamille(0);
              }}
            />
          </InputWrapper>
        </Grid.Col>
        <Grid.Col span={isActe ? 6 : 9}>
          <TextInput
            placeholder="test"
            label="Libelle"
            required
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Select
            value={Famille}
            onChange={(e) => setFamille(e)}
            label="Famille acte"
            placeholder="Pick one"
            data={familleSource.map((x) => ({ value: x.id, label: x.libelle }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button
            style={{ float: 'right' }}
            onClick={() => {
              if (isActe) {
                console.log(libelle);
                axios
                  .post('https://localhost:44319/api/Acte/Add', {
                    libelle: libelle,
                    acteFamilleId: Famille,
                  })
                  .then(() => {
                    props.setOpened(false);
                  })
                  .catch((err) => console.log(err));
              } else {
                axios
                  .post('https://localhost:44319/api/ActeFamille/Add', {
                    libelle: libelle,
                    acteFamille: Famille,
                  })
                  .then(() => {
                    props.setOpened(false);
                  })
                  .catch((err) => console.log(err));
              }
            }}
          >
            Save
          </Button>
          <Button variant="outline" color="gray" style={{ float: 'left' }}>
            Cancel
          </Button>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}

export default Acte;
