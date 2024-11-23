'use client';

import React, { useState, useEffect } from 'react';
import { Paper, Title, Text, Group, TextInput, Textarea, Button, Select, Checkbox, Grid } from '@mantine/core';
import {useTranslations} from 'next-intl';

const MedicalReport = () => {
  const { symptoms, medications, history, chronicConditions, keywords } = usePatientData();

  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medicationsState, setMedicationsState] = useState('');
  const [symptomsState, setSymptomsState] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  useEffect(() => {
    // Populate form fields with the context data
    setSymptomsState(symptoms.join(', '));
    setMedicationsState(medications.join(', '));
    setMedicalHistory(history);
  }, [symptoms, medications, history]);

  const handleSubmit = () => {
    // Log the data before submission
    console.log({
      patientName,
      age,
      gender,
      diagnosis,
      medicationsState,
      symptomsState,
      medicalHistory,
      chronicConditions,  // You can also log chronicConditions if needed
    });
  
    // Handle form submission here (e.g., save data, send to server)
    alert('Report Submitted');
  };
  const t = useTranslations('report');

  return (
    <Paper shadow="xs" padding="lg">
      <Group position="apart" mb="md">
        <Title order={2}>{t('title')}</Title>
      </Group>

      {/* Patient Details Section */}
      <Group direction="column" spacing="xs">
        <TextInput
          label={t('name')}
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder={t('enterName')}
        />
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label={t('age')}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={t('enterAge')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label={t('gender')}
              value={gender}
              onChange={(value) => setGender(value)}
              data={[
                { value: 'male', label: t('male') },
                { value: 'female', label: t('female') },
                { value: 'other', label: t('other') },
              ]}
            />
          </Grid.Col>
        </Grid>
      </Group>

      {/* Medical History Section */}
      <Textarea
        label={t('medicalHistory')}
        value={medicalHistory}
        onChange={(e) => setMedicalHistory(e.target.value)}
        placeholder={t('enterHistory')}
        minRows={4}
        mt="md"
      />

      {/* Symptoms Section */}
      <Textarea
        label={t('symptoms')}
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder={t('enterSymptoms')}
        minRows={4}
        mt="md"
      />

      {/* Diagnosis Section */}
      <TextInput
        label={t('diagnosis')}
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        placeholder={t('enterDiagnosis')}
        mt="md"
      />

      {/* Medications Section */}
      <Textarea
        label={t('medications')}
        value={medications}
        onChange={(e) => setMedications(e.target.value)}
        placeholder={t('enterMedications')}
        minRows={4}
        mt="md"
      />

      {/* Allergies Section */}
      <Textarea
        label={t('allergies')}
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
        placeholder={t('enterAllergies')}
        minRows={4}
        mt="md"
      />

      {/* Test Results Section */}
      <Textarea
        label={t('testResults')}
        value={testResults}
        onChange={(e) => setTestResults(e.target.value)}
        placeholder={t('enterTestResults')}
        minRows={4}
        mt="md"
      />

      {/* Submit Button */}
      <Group position="center" mt="lg">
        <Button onClick={handleSubmit} color="blue">
          {t('submit')}
        </Button>
      </Group>
    </Paper>
  );
};

export default MedicalReport;