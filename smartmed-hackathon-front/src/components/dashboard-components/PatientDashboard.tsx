// components/dashboard-components/PatientDashboard.jsx
import React from 'react';
import { Card, Avatar, Text, Group, Title, Collapse, Button, Stack, Divider , Flex} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

function PatientDashboard() {
  // Disclosure hooks for collapsible sections
  const [openedSymptoms, { toggle: toggleSymptoms }] = useDisclosure(false);
  const [openedMedications, { toggle: toggleMedications }] = useDisclosure(false);
  const [openedHistory, { toggle: toggleHistory }] = useDisclosure(false);
  const [openedConditions, { toggle: toggleConditions }] = useDisclosure(false);

  // Replace these with actual patient data
  const patient = {
    photo: 'https://via.placeholder.com/150', // Placeholder photo URL
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    age: 35,
    height: 175,
    weight: 70,
    lastAppointment: '2024-11-01',
  };

  return (
    <Card shadow="sm" padding="lg" radius="xs" withBorder className="w-[400px]">
      {/* Patient Details */}
      <Group position="apart" mb="5" mt="2">
        <Group >
          <Avatar src={patient.photo} size={120
          } radius="md" />
          <Flex 
          direction="column"
          >
            <Text size="lg" weight={700}>{patient.firstName} {patient.lastName}</Text>
            <Text>Gender: {patient.gender}</Text>
            <Text>Age: {patient.age}</Text>
            <Text>Height: {patient.height} cm</Text>
            <Text>Weight: {patient.weight} kg</Text>
            <Text>Last Appointment: {patient.lastAppointment}</Text>
          </Flex>
        </Group>
      </Group>

      <Divider my="sm" />

      {/* New Collected Data */}
      <Title order={2} mb="md">New Collected Data</Title>

      {/* Collapsible Sections */}
      {renderCollapsibleSection('Symptoms', openedSymptoms, toggleSymptoms, ['Headache', 'Fatigue', 'Nausea'])}
      {renderCollapsibleSection('Current Medications', openedMedications, toggleMedications, ['Ibuprofen', 'Metformin'])}
      {renderCollapsibleSection('Medical Life', openedHistory, toggleHistory, 'No previous major illnesses reported.')}
      {renderCollapsibleSection('Chronic Conditions', openedConditions, toggleConditions, 'Type 2 Diabetes')}
    </Card>
  );
}

function renderCollapsibleSection(title, opened, toggle, content) {
  return (
    <>
      <Button onClick={toggle} variant="light" fullWidth rightIcon={opened ? <IconChevronUp /> : <IconChevronDown />}>
        {title}
      </Button>
      <Collapse in={opened}>
        <Stack p="sm" spacing="xs" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          {Array.isArray(content) ? content.map((item, index) => (
            <Text key={index} size="sm">• {item}</Text>
          )) : (
            <Text size="sm">{content}</Text>
          )}
        </Stack>
      </Collapse>
    </>
  );
}

export default PatientDashboard;
