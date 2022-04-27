import { useState, useReducer, useEffect } from 'react';
// import { Formik, Form, Field } from 'formik';
import {
  Container,
  Group,
  Grid,
  Textarea,
  TextInput,
  InputWrapper,
  Select,
  Title,
  createStyles,
  UnstyledButton,
  Checkbox,
  Text,
  SimpleGrid,
  Stepper,
  Switch,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useUncontrolled } from '@mantine/hooks';
import { Calendar } from 'tabler-icons-react';
import axios from 'axios';

import StyledStepper from '../../library/components/StyledStepper';

const p = {
  id: 0,
  libelle: 'string',
  sousProduits: [0],
  libelleCommercial: 'string',
  dateEffet: '2022-04-26T02:11:09.197Z',
  enseigne: 'string',
  risques: [0],
  gestionPrestation: true,
  gestionCotisation: true,
  zones: [0],
  idDevise: 0,
  description: 'string',
};

function AddProduct() {
  const [libelle, setLibelle] = useState(p.libelle);
  const [libelleCommercial, setLibelleCommercial] = useState(
    p.libelleCommercial
  );
  const [dateEffet, setDateEffet] = useState(p.dateEffet);
  const [enseigne, setEnseigne] = useState(p.enseigne);
  const [risques, setRisques] = useState(p.risques);
  const [gestionPrestation, setGestionPrestation] = useState(
    p.gestionPrestation
  );
  const [gestionCotisation, setGestionCotisation] = useState(
    p.gestionCotisation
  );
  const [zones, setZones] = useState(p.zones);
  const [idDevise, setIdDevise] = useState(p.idDevise);
  const [description, setDescription] = useState(p.description);
  const [isSousproduct, setIsSousproduct] = useState(false);
  const [idParent, setIdParent] = useState(0);
  const sendPost = (data) => {
    axios
      .post('https://localhost:44319/api/Produit/Add', { ...data })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => console.log(err));
  };
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <>
      <Group position="center" direction="column">
        <Container
          style={{
            width: '100%',
          }}
        >
          <Title
            order={2}
            sx={(theme) => ({
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.blue[4]
                  : theme.colors.blue[7],
            })}
          >
            Ajout Produit
          </Title>
        </Container>
        <Container
          style={{
            width: '100%',
          }}
        >
          <StyledStepper
            active={active}
            setActive={setActive}
            nextStep={() => nextStep()}
            prevStep={() => prevStep()}
            cb={() =>
              sendPost({
                libelle: libelle,
                sousProduits: [1],
                libelleCommercial: libelleCommercial,
                dateEffet: dateEffet,
                enseigne: enseigne,
                risques: [1],
                gestionPrestation: true,
                gestionCotisation: true,
                zones: [1],
                idDevise: 1,
                description: description,
              })
            }
          >
            <Stepper.Step label="Générale">
              <FirstForm
                libelle={libelle}
                setLibelle={setLibelle}
                libelleCommercial={libelleCommercial}
                setLibelleCommercial={setLibelleCommercial}
                dateEffet={dateEffet}
                setDateEffet={setDateEffet}
                isSousproduct={isSousproduct}
                setIsSousproduct={setIsSousproduct}
                idParent={idParent}
                setIdParent={setIdParent}
              />
            </Stepper.Step>
            <Stepper.Step label="Enseigne & Risques">
              <SecondForm
                enseigne={enseigne}
                setEnseigne={setEnseigne}
                risques={risques}
                setRisques={setRisques}
              />
            </Stepper.Step>
            <Stepper.Step label="Informations Complémentaire">
              <ThirdFrom
                gestionPrestation={gestionPrestation}
                setGestionPrestation={setGestionPrestation}
                gestionCotisation={gestionCotisation}
                setGestionCotisation={setGestionCotisation}
                zones={zones}
                setZones={setZones}
                idDevise={idDevise}
                setIdDevise={setIdDevise}
                description={description}
                setDescription={setDescription}
              />
            </Stepper.Step>
          </StyledStepper>
        </Container>
      </Group>
    </>
  );
}

function FirstForm({ ...props }) {
  const [listProduit, setListProduit] = useState([]);
  useEffect(() => {
    axios
      .get('https://localhost:44319/api/Produit/GetAll')
      .then((response) => {
        setListProduit(
          response.data.map((x) => ({ value: x.id, label: x.libelle }))
        );
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <Grid>
      <Grid.Col span={12}>
        <TextInput
          placeholder="EX : ASC"
          label="Nom"
          value={props.libelle}
          onChange={(event) => {
            props.setLibelle(event.currentTarget.value);
          }}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <TextInput
          placeholder="EX : ASC"
          label="Nom Commercial"
          value={props.libelleCommercial}
          onChange={(event) =>
            props.setLibelleCommercial(event.currentTarget.value)
          }
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <DatePicker
          icon={<Calendar size={16} />}
          amountOfMonths={2}
          placeholder="March 1, 2022"
          label="Date d'effet"
          value={props.dateEffet}
          onChange={(de) => props.setDateEffet(de)}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <InputWrapper label="Attache a un Produit">
          <Switch
            checked={props.isSousproduct}
            onChange={(event) => {
              props.setIsSousproduct(event.currentTarget.checked);
            }}
          />
        </InputWrapper>
      </Grid.Col>
      {props.isSousproduct && (
        <Grid.Col span={9}>
          <Select
            label="Parent"
            value={props.idParent}
            onChange={(event) => {
              props.setIdParent(event);
              console.log(listProduit);
            }}
            data={listProduit}

            // data={props.listProduit}
          />
        </Grid.Col>
      )}
    </Grid>
  );
}
function SecondForm({ ...props }) {
  const riskList = [
    { id: '1', title: 'Santé', value: false, description: 'Santé' },
    {
      id: '2',
      title: 'Prévoyance',
      value: false,
      description: 'Prévoyance',
    },
    {
      id: '3',
      title: 'Assisstance',
      value: false,
      description: 'Assisstance',
    },
    {
      id: '4',
      title: 'Retraite',
      value: false,
      description: 'Retraite',
    },
    {
      id: '5',
      title: 'Obsèques',
      value: false,
      description: 'Obsèques',
    },
    {
      id: '6',
      title: 'Responsabilité civile',
      value: false,
      description: 'Responsabilité civile',
    },
  ];
  function reducer(state, action) {
    switch (action.type) {
      case 'select':
        const list = state.map((item) =>
          item.id === action.item.id ? { ...item, value: !item.value } : item
        );
        return list;
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, riskList);
  return (
    <Grid>
      <Grid.Col span={12}>
        <TextInput
          placeholder="EX : ASC"
          label="Enseighne"
          required
          value={props.enseigne}
          onChange={(event) => props.setEnseigne(event.currentTarget.value)}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <InputWrapper label="Risques">
          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: 'md', cols: 2 },
              { maxWidth: 'sm', cols: 1 },
            ]}
            spacing="lg"
          >
            {state.map((item) => (
              <ImageCheckbox
                onChange={() => {
                  dispatch({ type: 'select', item });
                }}
                {...item}
                key={item.title}
              />
            ))}
          </SimpleGrid>
        </InputWrapper>
      </Grid.Col>
    </Grid>
  );
}
function ThirdFrom({ ...props }) {
  function reducer(state, action) {
    switch (action.type) {
      case 'select':
        const list = state.map((item) =>
          item.id === action.item.id
            ? { ...item, checked: true }
            : { ...item, checked: false }
        );

        return list;
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, [
    {
      id: '1',
      title: 'Gestion prestation & cotisation',
      value: false,
      description: '',
    },
    {
      id: '2',
      title: 'Gestion prestation seule',
      value: false,
      description: ' ',
    },
    {
      id: '3',
      title: 'Gestion cotisation seule',
      value: false,
      description: ' ',
    },
  ]);
  return (
    <Grid>
      <Grid.Col span={12}>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'sm', cols: 1 },
          ]}
        >
          {state.map((item) => (
            <ImageCheckbox
              onChange={() => {
                dispatch({ type: 'select', item });
                props.setGestion(state.filter((r) => r.checked === true));
              }}
              {...item}
              key={item.title}
            />
          ))}
        </SimpleGrid>
      </Grid.Col>
      <Grid.Col span={12}>
        <Select
          label="Zone"
          placeholder="Espèce"
          data={[
            { value: 'Espèce', label: 'Espèce' },
            { value: 'Chèque', label: 'Chèque' },
            { value: 'Carte bancaire', label: 'Carte bancaire' },
          ]}
          searchable
          clearable
          value={props.zone}
          onChange={(z) => {}}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Select
          label="Devise"
          placeholder="Mensuel"
          data={[
            { value: 'Mensuel', label: 'Mensuel' },
            { value: 'Trimestriel', label: 'Trimestriel' },
            { value: 'Semestriel', label: 'Semestriel' },
          ]}
          searchable
          clearable
          value={props.devise}
          onChange={(d) => {}}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Textarea
          placeholder="Your comment"
          label="Description"
          value={props.description}
          onChange={(event) => props.setDescription(event.currentTarget.value)}
        />
      </Grid.Col>
    </Grid>
  );
}

export default AddProduct;

function ImageCheckbox({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  image,
  ...others
}) {
  const useStyles = createStyles((theme, { checked }) => ({
    button: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      transition: 'background-color 150ms ease, border-color 150ms ease',
      border: `1px solid ${
        checked
          ? theme.colors[theme.primaryColor][
              theme.colorScheme === 'dark' ? 9 : 6
            ]
          : theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[3]
      }`,
      borderRadius: theme.radius.sm,
      padding: theme.spacing.sm,
      backgroundColor: checked
        ? theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.3)
          : theme.colors[theme.primaryColor][0]
        : theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.white,
    },

    body: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
  }));

  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
    rule: (val) => typeof val === 'boolean',
  });

  const { classes, cx } = useStyles({ checked: value });

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      className={cx(classes.button, className)}
    >
      {/* <Image src={image} alt={title} width={40} /> */}

      <div className={classes.body}>
        <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }} mb={5}>
          {description}
        </Text>
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
          {title}
        </Text>
      </div>

      <Checkbox
        checked={value}
        onChange={() => {}}
        tabIndex={-1}
        styles={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
}
