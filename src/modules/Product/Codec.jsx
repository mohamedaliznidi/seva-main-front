import { useState, useEffect } from 'react';
import {
  Title,
  ActionIcon,
  Group,
  Badge,
  Input,
  Modal,
  Grid,
  Select,
  TextInput,
  Button,
  Slider,
  InputWrapper,
} from '@mantine/core';
import {
  Filter,
  FileDownload,
  Search,
  Plus,
  Pencil,
  Trash,
} from 'tabler-icons-react';
import axios from 'axios';

import Table from '../../components/Table';

const Codec = () => {
  const [data, setData] = useState([]);
  const [libelle, setLibelle] = useState('');
  const [age, setAge] = useState(18);
  const [zone, setZone] = useState(1);
  const [typeCotisant, setTypeCotisant] = useState('');
  const [idCode, setIdCode] = useState(0);
  const setFormData = (idCode, libelle, age, zone, typeCotisant) => {
    setIdCode(idCode);
    setLibelle(libelle);
    setAge(age);
    setZone(zone);
    setTypeCotisant(typeCotisant);
  };
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    axios
      .get('https://localhost:44319/api/RegleCalcul/GetAll')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // setData(Array(10).fill(rc));
  });
  const HeaderTemplate = () => (
    <tr>
      <td>Libelle</td>
      <td>Age</td>
      <td>Zone</td>
      <td>Type Cotisant</td>
      <td>Action</td>
    </tr>
  );
  const RowTemplate = ({ row }) => (
    <tr>
      <td>{row.libelle}</td>
      <td>{row.age}</td>
      <td>{row.zone.libelle}</td>
      <td>{row.typeCotisant}</td>
      <td>
        <Group>
          <ActionIcon
            size={35}
            variant="filled"
            color="blue"
            onClick={(e) => {
              setOpened(true);
              setFormData(
                row.id,
                row.libelle,
                row.age,
                row.zone.id,
                row.typeCotisant
              );
            }}
          >
            <Pencil size={20} />
          </ActionIcon>
          <ActionIcon
            size={35}
            color="red"
            variant="filled"
            onClick={() => {
              axios
                .post(
                  'https://localhost:44319/api/RegleCalcul/Delete?id=' + row.id
                )
                .then(() => {
                  setOpened(true);
                  setOpened(false);
                })
                .catch((err) => console.log(err));
            }}
          >
            <Trash size={20} />
          </ActionIcon>
        </Group>
      </td>
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
              List des Code Calcul
            </Title>
            <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              {data.length} Calculs
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
              onClick={() => {
                setOpened(true);
                setFormData(undefined, '', 18, 1, 'Assuré');
              }}
            >
              <Plus size={20} />
            </ActionIcon>
          </Group>
        </Group>
      </div>
      <Table
        HeaderTemplate={HeaderTemplate}
        RowTemplate={RowTemplate}
        data={data}
      />
      <CodeCaclulPopup
        opened={opened}
        setOpened={setOpened}
        onClose={() => setOpened(false)}
        setFormData={setFormData}
        libelle={libelle}
        age={age}
        zone={zone}
        typeCotisant={typeCotisant}
        setLibelle={setLibelle}
        setAge={setAge}
        setZone={setZone}
        setTypeCotisant={setTypeCotisant}
        setIdCode={setIdCode}
        idCode={idCode}
      />
    </>
  );
};

const CodeCaclulPopup = ({ data, ...props }) => {
  return (
    <Modal
      centered
      size="55%"
      opened={props.opened}
      onClose={() => props.setOpened(false)}
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
          Ajout Code Calcul
        </Title>
      }
    >
      <Grid>
        <Grid.Col sm={12} md={6}>
          <TextInput
            label="libelle"
            name="libelle"
            value={props.libelle}
            onChange={(e) => props.setLibelle(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <Select
            label="Type cotisant"
            placeholder="Pick one"
            value={props.typeCotisant}
            onChange={(e) => props.setTypeCotisant(e)}
            data={[
              { value: 'Assuré', label: 'Assuré' },
              { value: 'Assuré + Conjoint', label: 'Assuré + Conjoint' },
              { value: 'Assuré + Enfant', label: 'Assuré + Enfant' },
            ]}
          />
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <Select
            label="Zone"
            placeholder="Pick one"
            value={props.zone}
            onChange={(e) => props.setZone(e)}
            data={[
              { value: 1, label: 'Zone 1' },
              { value: 2, label: 'Zone 2' },
              { value: 3, label: 'Zone 3' },
            ]}
          />
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <InputWrapper label="Age">
            <Slider
              value={props.age}
              min={18}
              max={85}
              label={(value) => value}
              onChange={(e) => props.setAge(e)}
              step={1}
              marks={[
                { value: 20, label: '20' },
                { value: 40, label: '40' },
                { value: 60, label: '60' },
                { value: 80, label: '80' },
              ]}
            />
          </InputWrapper>
        </Grid.Col>
        <Grid.Col span={12}>
          <Button
            style={{ float: 'right' }}
            onClick={() => {
              console.log(props.idCode, props.libelle, props.zone, props.age);
              if (props.idCode === undefined) {
                axios
                  .post('https://localhost:44319/api/RegleCalcul/Add', {
                    libelle: props.libelle,
                    age: props.age,
                    zone: props.zone,
                    typeCotisant: props.typeCotisant,
                  })
                  .then(() => {
                    props.setOpened(false);
                  })
                  .catch((err) => console.log(err));
              } else {
                axios
                  .post('https://localhost:44319/api/RegleCalcul/Add', {
                    id: props.idCode,
                    libelle: props.libelle,
                    age: props.age,
                    zone: props.zone,
                    typeCotisant: props.typeCotisant,
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
        </Grid.Col>
      </Grid>
    </Modal>
  );
};

export default Codec;
