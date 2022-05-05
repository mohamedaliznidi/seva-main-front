import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Group,
  Grid,
  TextInput,
  Select,
  ScrollArea,
  Title,
  Stepper,
  Slider,
  InputWrapper,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Calendar } from 'tabler-icons-react';

import StyledStepper from '../../library/components/StyledStepper';
import { ProductButton } from '../../library/components/ProductButton';

const baseURL = 'http://localhost:5000/subscription';

function AddSubscription() {
  const [fullName, setFullName] = useState('test');
  const [nss, setNss] = useState('test');
  const [dateNais, setDateNais] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [pays, setPays] = useState('');
  const [type, setType] = useState('');
  const [produit, setProduit] = useState({});
  const [modePayement, setModePayement] = useState('');
  const [frequencePayement, setFrequencePayement] = useState('');
  const [tiers, setTiers] = useState('');
  const [jourAppel, setJourAppel] = useState('');
  const [montant, setMontant] = useState(0);
  const [listProduit, setListProduit] = useState([]);
  useEffect(() => {
    axios
      .get('https://localhost:44319/api/Produit/GetAll')
      //.get(
      //   'https://localhost:44319/api/RegleCalcul/GetProduits?tc=' +
      //     type +
      //     '&age=' +
      //     (new Date().getFullYear() - new Date(dateNais).getFullYear()) +
      //     '&zone=' +
      //     pays
      // )
      .then((response) => {
        setListProduit(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [pays, type, dateNais]);
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
            Ajout Souscription
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
              axios
                .post(baseURL, {
                  souscripteur: {
                    fullName,
                    nss,
                    dateNais,
                    mobile,
                    email,
                    adresse,
                  },
                  produit,
                  cotisation: {
                    modePayement,
                    frequencePayement,
                    tiers,
                    jourAppel,
                    montant,
                  },
                })
                .then((response) => {
                  console.log(response.data);
                })
            }
          >
            <Stepper.Step
              label="Souscripteur"
              description="Renseigner les informations générales"
            >
              <FirstForm
                fullName={fullName}
                setFullName={setFullName}
                nss={nss}
                setNss={setNss}
                dateNais={dateNais}
                setDateNais={setDateNais}
                mobile={mobile}
                setMobile={setMobile}
                email={email}
                setEmail={setEmail}
                adresse={adresse}
                setAdresse={setAdresse}
                type={type}
                setType={setType}
                pays={pays}
                setPays={setPays}
              />
            </Stepper.Step>
            <Stepper.Step label="Produits" description="List des produits">
              <SecondForm
                setActive={setActive}
                setProduit={setProduit}
                listProduit={listProduit}
              />
            </Stepper.Step>
            <Stepper.Step
              label="Informations Complémentaire"
              description="Renseigner les informations complémentaires"
            >
              <ThirdFrom
                modePayement={modePayement}
                setModePayement={setModePayement}
                frequencePayement={frequencePayement}
                setFrequencePayement={setFrequencePayement}
                tiers={tiers}
                setTiers={setTiers}
                jourAppel={jourAppel}
                setJourAppel={setJourAppel}
                montant={montant}
                setMontant={setMontant}
              />
            </Stepper.Step>
          </StyledStepper>
        </Container>
      </Group>
    </>
  );
}

function FirstForm({ ...props }) {
  return (
    <Grid>
      <Grid.Col span={12}>
        <TextInput
          placeholder="EX : ASC"
          label="Nom & Prénom"
          value={props.fullName}
          onChange={(event) => {
            props.setFullName(event.currentTarget.value);
          }}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <TextInput
          placeholder="EX : ASC"
          label="N° Sécurité Sociale"
          value={props.nss}
          onChange={(event) => {
            props.setNss(event.currentTarget.value);
          }}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <DatePicker
          amountOfMonths={2}
          icon={<Calendar size={16} />}
          placeholder="March 1, 2022"
          label="Date de naissance"
          required
          value={props.setDateNais}
          onChange={(dn) =>
            props.setDateNais(
              `${dn.getDate()}/${dn.getMonth() + 1}/${dn.getFullYear()}`
            )
          }
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <TextInput
          placeholder="50 495 960"
          label="Mobile"
          required
          value={props.mobile}
          onChange={(event) => {
            props.setMobile(event.currentTarget.value);
          }}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <TextInput
          placeholder="test@test.test"
          label="Email"
          value={props.email}
          onChange={(event) => {
            props.setEmail(event.currentTarget.value);
          }}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <Select
          label="Pays"
          placeholder="Pick one"
          value={props.pays}
          onChange={(e) => props.setPays(e)}
          data={[
            { value: 1, label: 'France' },
            { value: 2, label: 'Tunisie' },
          ]}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <TextInput
          placeholder="Adresse"
          label="Adresse"
          value={props.adresse}
          onChange={(event) => {
            props.setAdresse(event.currentTarget.value);
          }}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <Select
          label="Type cotisant"
          placeholder="Pick one"
          value={props.type}
          onChange={(e) => props.setType(e)}
          data={[
            { value: 'Assuré', label: 'Assuré' },
            { value: 'Assuré + Conjoint', label: 'Assuré + Conjoint' },
            { value: 'Assuré + Enfant', label: 'Assuré + Enfant' },
          ]}
        />
      </Grid.Col>
    </Grid>
  );
}

function ThirdFrom({ ...props }) {
  return (
    <Grid>
      <Grid.Col span={12}>
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
          value={props.modePayement}
          onChange={(v) => {
            props.setModePayement(v);
          }}
        />
      </Grid.Col>
      <Grid.Col span={12}>
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
          value={props.frequencePayement}
          onChange={(v) => {
            props.setFrequencePayement(v);
          }}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Select
          label="Tier payant"
          placeholder="Oui"
          data={[
            { value: 'Oui', label: 'Oui' },
            { value: 'Non', label: 'Non' },
          ]}
          searchable
          clearable
          value={props.tiers}
          onChange={(v) => {
            props.setTiers(v);
          }}
        />
      </Grid.Col>
      <Grid.Col span={12}>
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
          value={props.jourAppel}
          onChange={(v) => {
            props.setJourAppel(v);
          }}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <InputWrapper label="Montant">
          <Slider
            value={props.montant}
            min={18}
            max={85}
            label={(value) => value}
            onChange={(e) => props.setMontant(e)}
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
    </Grid>
  );
}

function SecondForm({ ...props }) {
  const buttonClickHandler = (item) => (e) => {
    props.setProduit(item);
    props.setActive(2);
  };
  return (
    <Grid p={0}>
      <Grid.Col span={12}>
        <Title
          sx={(theme) => ({
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.blue[4]
                : theme.colors.blue[6],
          })}
          order={3}
        >
          List des produits
        </Title>
      </Grid.Col>
      <ScrollArea style={{ height: '65vh', width: '100%' }}>
        {props.listProduit
          .map((x) => ({
            produit: x.libelle,
            courtier: x.enseigne,
            about: x.description,
          }))
          .map((item, index) => (
            <Grid.Col span={12} key={index}>
              <ProductButton
                {...item}
                onClick={buttonClickHandler(item)}
              ></ProductButton>
            </Grid.Col>
          ))}
      </ScrollArea>
    </Grid>
  );
}

export default AddSubscription;
