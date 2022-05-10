import { useEffect, useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  Center,
  Paper,
  ActionIcon,
  Title,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import QueryResult from '../QueryResult';

function StyledStepper({
  active,
  setActive,
  nextStep,
  prevStep,
  cb,
  data,
  ...props
}) {
  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="md">
        {props.children}
        <Stepper.Completed>
          <EndStep data={data} cb={() => cb()} />
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}

const EndStep = ({ cb, data }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log('here');
    cb();
    setLoading(false);
    setError(false);
  });
  return (
    <QueryResult loading={loading} error={error} data={{ hello: '' }}>
      <Center style={{ width: '100%', height: 400 }}>
        <Paper style={{ width: 300, height: 300 }}>
          <Center style={{ width: '100%', height: '100%' }}>
            <Group>
              <Title
                sx={(theme) => ({
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.blue[4]
                      : theme.colors.blue[6],
                })}
                order={3}
              >
                Saved
              </Title>
              <ActionIcon color="green" variant="filled">
                <Check />
              </ActionIcon>
            </Group>
          </Center>
        </Paper>
      </Center>
    </QueryResult>
  );
};

export default StyledStepper;
