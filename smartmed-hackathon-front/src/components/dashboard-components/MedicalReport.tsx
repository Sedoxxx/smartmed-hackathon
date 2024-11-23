import React, { useEffect, useState } from 'react';
import { Paper, Title, Text, Group, TextInput, Textarea, Button, Select, Grid } from '@mantine/core';
import { usePatientData } from '@/app/[locale]/context/PatientDataContext';

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

  return (
    <Paper shadow="xs" padding="lg">
      <Group position="apart" mb="md">
        <Title order={2}>Medical Report</Title>
      </Group>

      {/* Patient Details Section */}
      <Group direction="column" spacing="xs">
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
              data={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]}
            />
          </Grid.Col>
        </Grid>
      </Group>

      {/* Medical History Section */}
      <Textarea
        label="Medical History"
        value={medicalHistory}
        onChange={(e) => setMedicalHistory(e.target.value)}
        placeholder="Enter Patient's Medical History"
        minRows={3}
      />

      {/* Symptoms and Medications */}
      <TextInput
        label="Symptoms"
        value={symptomsState}
        onChange={(e) => setSymptomsState(e.target.value)}
        placeholder="Enter Symptoms"
        minRows={3}
      />
      <TextInput
        label="Medications"
        value={medicationsState}
        onChange={(e) => setMedicationsState(e.target.value)}
        placeholder="Enter Medications"
        minRows={3}
      />

      {/* Diagnosis Section */}
      <Textarea
        label="Diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        placeholder="Enter Diagnosis"
        minRows={3}
      />

      {/* Submit Button */}
      <Button onClick={handleSubmit} mt="sm">Submit Report</Button>
    </Paper>
  );
};

export default MedicalReport;