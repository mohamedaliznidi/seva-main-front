import { useState, useReducer, useEffect } from 'react';
import Service from '../../Services/Index';
import axios from 'axios';
import {
  Container,
  Group,
  Grid,
  TextInput,
  InputWrapper,
  Title,
  createStyles,
  UnstyledButton,
  Checkbox,
  Text,
  SimpleGrid,
  Stepper,
  MultiSelect,
  Anchor,
  Accordion,
  Button,
  Modal,
  Textarea,
  Select,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useUncontrolled } from '@mantine/hooks';
import { Calendar, CirclePlus } from 'tabler-icons-react';

import StyledStepper from '../../components/StyledStepper';

const actesDataTest = [
  {
    id: '1',
    libelle: 'famille1',
    value: 'famille1',
    label: 'famille1',
    actes: [
      { id: '5', libelle: 'Acte 2-1' },
      { id: '6', libelle: 'Acte 2-2' },
      { id: '7', libelle: 'Acte 2--3' },
      { id: '8', libelle: 'Acte 2--4' },
    ],
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
      },
      {
        id: '3',
        libelle: 'famille1--2',
        actes: [
          { id: '7', libelle: 'acte1--2--1' },
          { id: '8', libelle: 'acte1--2--2' },
          { id: '9', libelle: 'acte1--2--3' },
        ],
      },
    ],
  },
  {
    id: '4',
    libelle: 'famille2',
    value: 'famille2',
    label: 'famille2',
    actes: [
      { id: '5', libelle: 'Acte 2--1' },
      { id: '6', libelle: 'Acte 2--2' },
      { id: '7', libelle: 'Acte 2--3' },
      { id: '8', libelle: 'Acte 2--4' },
    ],
  },
];

const g = {
  id: 0,
  libelle: 'string',
  libelleCommercial: 'string',
  dateEffet: '2022-04-25T22:51:38.587Z',
  enseigne: 'string',
  risques: [0],
  gestionPrestation: true,
  gestionCotisation: true,
  zones: [0],
  idDevise: 0,
  description: 'string',
  sousProduitId: 0,
};

function AddGarantie() {
  const [active, setActive] = useState(0);
  const [libelle, setLibelle] = useState('');
  const [libelleCommercial, setLibelleCommercial] = useState('');
  const [dateEffet, setDateEffet] = useState('');
  const [enseigne, setEnseigne] = useState('');
  const risques = [1];
  const [gestionPrestation, setGestionPrestation] = useState(true);
  const [gestionCotisation, setGestionCotisation] = useState(true);
  const zones = [1];
  const [description, setDescription] = useState('');
  const [sousProduitId, setSousProduitId] = useState(0);
  const [sousProduitSrc, setSousProduitSrc] = useState([]);
  const [data, setData] = useState({});

  const idDevise = 1;

  const [familleSource, setFamilleSource] = useState([]);

  useEffect(() => {
    Service.Get('https://localhost:44319/api/SousProduit/GetAll').then(
      (response) => {
        setSousProduitSrc(response);
        console.log(sousProduitSrc);
      }
    );
  }, []);
  useEffect(() => {
    Service.Get('https://localhost:44319/api/ActeFamille/GetHierarchy').then(
      (response) => {
        setFamilleSource(response);
      }
    );
  }, []);
  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
    setData({
      ...data,
      libelle,
      libelleCommercial,
      dateEffet,
      enseigne,
      risques,
      gestionPrestation,
      gestionCotisation,
      zones,
      description,
      sousProduitId,
      idDevise,
    });
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    setData({
      ...data,
      libelle,
      libelleCommercial,
      dateEffet,
      enseigne,
      risques,
      gestionPrestation,
      gestionCotisation,
      zones,
      description,
      sousProduitId,
      idDevise,
    });
  };

  const sendPost = (data) => {
    console.log('zzzzzzzzz');
    console.log(data);
    axios
      .post('https://localhost:44319/api/Garantie/Add', { ...data })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => console.log(err));
    console.log(data);
  };
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
            Ajout Garantie
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
            cb={() => sendPost(data)}
          >
            <Stepper.Step label="Générale">
              <FirstForm
                libelle={libelle}
                libelleCommercial={libelleCommercial}
                dateEffet={dateEffet}
                enseigne={enseigne}
                gestionPrestation={gestionPrestation}
                gestionCotisation={gestionCotisation}
                description={description}
                sousProduitId={sousProduitId}
                sousProduitSrc={sousProduitSrc}
                setLibelle={setLibelle}
                setLibelleCommercial={setLibelleCommercial}
                setDateEffet={setDateEffet}
                setEnseigne={setEnseigne}
                setGestionPrestation={setGestionPrestation}
                setGestionCotisation={setGestionCotisation}
                setDescription={setDescription}
                setSousProduitId={setSousProduitId}
              />
            </Stepper.Step>
            <Stepper.Step label="Actes & Code Calcul">
              <SecondForm
                familleSource={familleSource}
                setFamilleSource={setFamilleSource}
              />
            </Stepper.Step>
          </StyledStepper>
        </Container>
      </Group>
    </>
  );
}

function FirstForm({ ...props }) {
  const riskList = [
    { id: '1', title: 'Santé', value: [0], c: 'Santé' },
    {
      id: '2',
      title: 'Prévoyance',
      value: [0],
      description: 'Prévoyance',
    },
    {
      id: '3',
      title: 'Assisstance',
      value: [0],
      description: 'Assisstance',
    },
    {
      id: '4',
      title: 'Retraite',
      value: [0],
      description: 'Retraite',
    },
    {
      id: '5',
      title: 'Obsèques',
      value: [0],
      description: 'Obsèques',
    },
    {
      id: '6',
      title: 'Responsabilité civile',
      value: [0],
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
  console.log(props.sousProduitSrc);
  console.log('hedhi');
  return (
    <>
      <Title
        sx={(theme) => ({
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.gray[4]
              : theme.colors.gray[7],
        })}
        order={4}
      >
        Identié Garantie
      </Title>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            placeholder="EX : ASC"
            label="Nom"
            value={props.libelle}
            onChange={(e) => props.setLibelle(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            placeholder="EX : ASC"
            label="Nom Commercial"
            value={props.libelleCommercial}
            onChange={(event) =>
              props.setLibelleCommercial(event.currentTarget.value)
            }
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <DatePicker
            label="Date d'effet"
            value={props.dateEffet}
            onChange={(e) => props.setDateEffet(e)}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            placeholder="EX : ASC"
            label="Enseigne"
            value={props.enseigne}
            onChange={(e) => props.setEnseigne(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            placeholder="EX : ASC"
            label="Description"
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Select
            label="Sous produit"
            value={props.sousProduitId}
            onChange={(e) => props.setSousProduitId(e)}
            data={props.sousProduitSrc.map((e) => ({
              value: e.id,
              label: e.libelle,
            }))}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <InputWrapper
            label={
              <Title
                sx={(theme) => ({
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.gray[4]
                      : theme.colors.gray[7],
                })}
                order={4}
              >
                List des Risques
              </Title>
            }
          >
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
    </>
  );
}

const SecondForm = ({ ...props }) => {
  const [selectedFamilie, setSelectedFamilie] = useState([]);
  const [displayedActes, setDisplayedActes] = useState([]);
  const [popupOpened, setPopupOpened] = useState(false);
  const [popupData, setPopupData] = useState({
    codeCalc: 'codeCalcul',
    dateEffet: '01-01-1010',
    dateFin: '01-01-1010',
  });
  const CodeCaclulPopup = ({ data, ...props }) => {
    const [codeCalc, setCodeCalc] = useState(
      data.codeCalc ? data.codeCalc : []
    );
    const [dateEffet, setDateEffet] = useState(
      data.dateEffet ? data.dateEffet : ''
    );
    const [dateFin, setDateFin] = useState(data.dateFin ? data.dateFin : '');
    const [ccalc, setccalc] = useState([]);

    useEffect(() => {
      axios
        .get('https://localhost:44319/api/RegleCalcul/GetAll')
        .then((response) => {
          setccalc(response.data);
          console.log(response.data);
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // setData(Array(10).fill(rc));
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
            Affecter Code Calcul
          </Title>
        }
      >
        <Grid>
          <Grid.Col span={12}>
            <MultiSelect
              data={ccalc.map((e) => ({
                value: e.id,
                label: e.libelle,
              }))}
              label="Codes calculs"
              placeholder="Pick all that you like"
              value={codeCalc}
              onChange={(value) => {
                setCodeCalc(value);
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            {' '}
            <DatePicker
              icon={<Calendar size={16} />}
              amountOfMonths={2}
              placeholder="March 1, 2022"
              label="Date d'effet"
              required
              value={dateEffet}
              onChange={(de) =>
                setDateEffet(
                  `${de.getDate()}/${de.getMonth() + 1}/${de.getFullYear()}`
                )
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DatePicker
              icon={<Calendar size={16} />}
              amountOfMonths={2}
              placeholder="March 1, 2022"
              label="Date fin"
              required
              value={dateFin}
              onChange={(df) =>
                setDateFin(
                  `${df.getDate()}/${df.getMonth() + 1}/${df.getFullYear()}`
                )
              }
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              style={{ float: 'right' }}
              onClick={() => {
                setPopupData({
                  codeCalc: codeCalc,
                  dateEffet: dateEffet,
                  dateFin: dateFin,
                  ...data,
                });
                setPopupOpened(false);
              }}
            >
              Affecter
            </Button>
            <Button variant="outline" color="gray" style={{ float: 'left' }}>
              Cancel
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    );
  };

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
  const [state, dispatch] = useReducer(
    reducer,
    selectedFamilie
      .map((sf) => props.familleSource.find((e) => e.libelle === sf))
      .map((e, index) =>
        e.actes.map((a) => ({
          codeCalc: 'codeCalcul',
          dateEffet: '01-01-1010',
          dateFin: '01-01-1010',
          label: selectedFamilie[index],
          acte: a.libelle,
          id: a.id,
          checked: false,
        }))
      )
      .flat()
  );
  useEffect(() => {
    console.log('selectedFamilie', selectedFamilie);
  }, [selectedFamilie]);
  useEffect(() => {
    console.log('displayedActes', displayedActes);
  }, [displayedActes]);
  useEffect(() => {
    console.log('[state, dispatch]', [state, dispatch]);
  });

  return (
    <>
      <CodeCaclulPopup
        opened={popupOpened}
        onClose={() => setPopupOpened(false)}
        data={popupData}
        setData={setPopupData}
      />
      <MultiSelect
        data={props.familleSource.map((e) => e.libelle)}
        label="List des Famille des actes"
        placeholder="Pick all that you like"
        value={selectedFamilie}
        onChange={(value) => {
          setSelectedFamilie(value);
          setDisplayedActes(
            value
              .map((sf) => props.familleSource.find((e) => e.libelle === sf))
              .map((e, index) =>
                e.actes.map((a) => ({
                  codeCalc: 'codeCalcul',
                  dateEffet: '01-01-1010',
                  dateFin: '01-01-1010',
                  label: value[index],
                  acte: a.libelle,
                  id: a.id,
                  checked: false,
                }))
              )
              .flat()
          );
        }}
      />
      <Group position="apart" mb={5} style={{ marginTop: 10 }}>
        <Title
          sx={(theme) => ({
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.gray[4]
                : theme.colors.gray[7],
            marginBottom: 10,
          })}
          order={4}
        >
          List des Actes
        </Title>
        <Anchor
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setPopupOpened(true);
          }}
          sx={(theme) => ({
            paddingTop: 2,
            color:
              theme.colors[theme.primaryColor][
                theme.colorScheme === 'dark' ? 4 : 6
              ],
            fontWeight: 500,
            fontSize: theme.fontSizes.xs,
          })}
        >
          Affecter Code
        </Anchor>
      </Group>
      {selectedFamilie.length !== 0 ? (
        <Accordion
          icon={<CirclePlus size={16} />}
          disableIconRotation
          iconPosition="right"
        >
          {selectedFamilie.map((i) => (
            <Accordion.Item label={i} key={i}>
              <SimpleGrid
                cols={3}
                breakpoints={[
                  { maxWidth: 'md', cols: 2 },
                  { maxWidth: 'sm', cols: 1 },
                ]}
                spacing="lg"
              >
                {displayedActes
                  .filter((c) => c.label === i)
                  .map((e) => (
                    <ActeCodeCheckbox {...e} onCheckChange={() => {}} />
                  ))}
              </SimpleGrid>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        'Select famille des actes'
      )}
    </>
  );
};

export default AddGarantie;

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

function ActeCodeCheckbox({
  checked,
  defaultChecked,
  onCheckChange,
  acte,
  codeCalc,
  className,
  dateEffet,
  dateFin,
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
    onCheckChange,
    rule: (val) => typeof val === 'boolean',
  });

  const { classes, cx } = useStyles({ checked: value });

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      className={cx(classes.button, className)}
    >
      <div className={classes.body}>
        <Group style={{ marginBottom: 5 }}>
          <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
            {acte}
          </Text>
          <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }} mb={5}>
            {codeCalc}
          </Text>
        </Group>
        <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }} mb={5}>
          {`${dateEffet}->${dateFin}`}
        </Text>
      </div>

      <Checkbox
        checked={value}
        onChange={() => handleChange(!value)}
        tabIndex={-1}
        styles={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
}
