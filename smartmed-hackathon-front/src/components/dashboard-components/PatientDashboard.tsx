import React from 'react';
import { Card, Avatar, Text, Group, Title, Collapse, Button, Stack, Divider, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
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

  // Translations
  const t = useTranslations('personalDetails');
  const d = useTranslations('newCollectedData');

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
      <Group position="apart" mb="5" mt="2">
        <Group>
          <Avatar src={patient.photo} size={120} radius="md" />
          <Flex direction="column">
            <Text size="lg" weight={700}>
              {patient.firstName} {patient.lastName}
            </Text>
            <Text>{t('gender')}: {patient.gender}</Text>
            <Text>{t('age')}: {patient.age}</Text>
            <Text>{t('height')}: {patient.height} cm</Text>
            <Text>{t('weight')}: {patient.weight} kg</Text>
            <Text>{t('lastAppointmentDate')}: {patient.lastAppointment}</Text>
          </Flex>
        </Group>
      </Group>

      <Divider my="sm" />

      {/* New Collected Data */}
      <Title order={2} mb="md">{d('title')}</Title>

      {/* Collapsible Sections with Localized Titles */}
      {renderCollapsibleSection(d('symptoms'), openedSymptoms, toggleSymptoms, ['Headache', 'Fatigue', 'Nausea'])}
      {renderCollapsibleSection(d('currentMedications'), openedMedications, toggleMedications, ['Ibuprofen', 'Metformin'])}
      {renderCollapsibleSection(d('medicalLife'), openedHistory, toggleHistory, 'No previous major illnesses reported.')}
      {renderCollapsibleSection(d('chronicCondition'), openedConditions, toggleConditions, 'Type 2 Diabetes')}
    </Card>
  );
}

function renderCollapsibleSection(title, opened, toggle, content, updateFunction) {
  return (
    <>
      <Button
        onClick={toggle}
        variant="light"
        fullWidth
        rightIcon={opened ? <IconChevronUp /> : <IconChevronDown />}
      >
        {title}
      </Button>
      <Collapse in={opened}>
        <Stack p="sm" spacing="xs" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          {Array.isArray(content) ? (
            content.map((item, index) => (
              <Text key={index} size="sm">• {item}</Text>
            ))
          ) : (
            <Text size="sm">{content}</Text>
          )}
        </Stack>
      </Collapse>
    </>
  );
}

export default PatientDashboard;