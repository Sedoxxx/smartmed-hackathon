import React from 'react';
import { Card, Avatar, Text, Group, Title, Collapse, Button, Stack, Divider, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { PatientDataProvider } from '@/app/[locale]/context/PatientDataContext';
import { usePatientData } from '@/app/[locale]/context/PatientDataContext';

function PatientDashboard() {
  const { 
    symptoms, medications, history, chronicConditions,
    updateSymptoms, updateMedications, updateHistory, updateChronicConditions 
  } = usePatientData();

  const [openedSymptoms, { toggle: toggleSymptoms }] = useDisclosure(false);
  const [openedMedications, { toggle: toggleMedications }] = useDisclosure(false);
  const [openedHistory, { toggle: toggleHistory }] = useDisclosure(false);
  const [openedConditions, { toggle: toggleConditions }] = useDisclosure(false);

  return (
    <Card shadow="sm" padding="lg" radius="xs" withBorder className="w-[400px]">
      <Group position="apart" mb="5" mt="2">
        <Group>
          <Avatar size={120} radius="md" />
          <Flex direction="column">
            <Text size="lg" weight={700}>John Doe</Text>
            {/* Static data replaced */}
            <Text>Gender: Male</Text>
            <Text>Age: 35</Text>
            <Text>Height: 175 cm</Text>
            <Text>Weight: 70 kg</Text>
            <Text>Last Appointment: 2024-11-01</Text>
          </Flex>
        </Group>
      </Group>

      <Divider my="sm" />
      <Title order={2} mb="md">New Collected Data</Title>

      {/* Pass dynamic context data */}
      {renderCollapsibleSection('Symptoms', openedSymptoms, toggleSymptoms, symptoms, updateSymptoms)}
      {renderCollapsibleSection('Current Medications', openedMedications, toggleMedications, medications, updateMedications)}
      {renderCollapsibleSection('Medical History', openedHistory, toggleHistory, [history], updateHistory)}
      {renderCollapsibleSection('Chronic Conditions', openedConditions, toggleConditions, chronicConditions, updateChronicConditions)}
    </Card>
  );
}

function renderCollapsibleSection(title, opened, toggle, content, updateFunction) {
  return (
    <>
      <Button onClick={toggle} variant="light" fullWidth rightIcon={opened ? <IconChevronUp /> : <IconChevronDown />}>
        {title}
      </Button>
      <Collapse in={opened}>
        <Stack p="sm" spacing="xs" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          {Array.isArray(content) ? content.map((item, index) => (
            <Text key={index} size="sm">{item}</Text>
          )) : (
            <Text size="sm">{content}</Text>
          )}
        </Stack>
      </Collapse>
    </>
  );
}

export default PatientDashboard;