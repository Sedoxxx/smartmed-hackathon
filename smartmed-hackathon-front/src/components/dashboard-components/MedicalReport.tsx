'use client';

import React, { useState } from 'react';
import { Paper, Title, Text, Group, TextInput, Textarea, Button, Select, Checkbox, Grid } from '@mantine/core';

const MedicalReport = () => {
  // Sample state to represent patient's medical data
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medications, setMedications] = useState('');
  const [allergies, setAllergies] = useState('');
  const [testResults, setTestResults] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  const handleSubmit = () => {
    // Handle form submission here (e.g., save data, send to server)
    alert('Report Submitted');
  };

  return (
    <Paper shadow="xs" padding="lg" className='overflow-y-auto h-full'>
      {/* Medical Report Header */}
      <Group position="apart" mb="md">
        <Title order={2}>Medical Report</Title>
      </Group>

      {/* Patient Details Section */}
      <Group direction="column" spacing="xs" >
        <TextInput
          label="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter Patient Name"
        />
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter Patient Age"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Gender"
              value={gender}
              onChange={(value) => setGender(value)}
              data={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </Grid.Col>
        </Grid>
      </Group>

      {/* Medical History Section */}
      <Textarea
        label="Medical History"
        value={medicalHistory}
        onChange={(e) => setMedicalHistory(e.target.value)}
        placeholder="Enter patient's medical history"
        minRows={4}
        mt="md"
      />

      {/* Symptoms Section */}
      <Textarea
        label="Current Symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Enter current symptoms"
        minRows={4}
        mt="md"
      />

      {/* Diagnosis Section */}
      <TextInput
        label="Diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        placeholder="Enter diagnosis"
        mt="md"
      />

      {/* Medications Section */}
      <Textarea
        label="Medications"
        value={medications}
        onChange={(e) => setMedications(e.target.value)}
        placeholder="Enter prescribed medications"
        minRows={4}
        mt="md"
      />

      {/* Allergies Section */}
      <Textarea
        label="Known Allergies"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
        placeholder="Enter known allergies"
        minRows={4}
        mt="md"
      />

      {/* Test Results Section */}
      <Textarea
        label="Test Results"
        value={testResults}
        onChange={(e) => setTestResults(e.target.value)}
        placeholder="Enter any relevant test results"
        minRows={4}
        mt="md"
      />

      {/* Submit Button */}
      <Group position="center" mt="lg">
        <Button onClick={handleSubmit} color="blue">
          Submit Report
        </Button>
      </Group>
    </Paper>
  );
};

export default MedicalReport;
