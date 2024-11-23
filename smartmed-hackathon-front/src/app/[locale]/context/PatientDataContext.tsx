import React, { createContext, useContext, useState } from 'react';

// Create a context
const PatientDataContext = createContext();

// Context provider component
export const PatientDataProvider = ({ children }) => {
  // Initialize all state values with sample data
  const [symptoms, setSymptoms] = useState(['Headache', 'Fatigue']);
  const [medications, setMedications] = useState(['Ibuprofen', 'Metformin']);
  const [history, setHistory] = useState('No previous major illnesses reported.');
  const [chronicConditions, setChronicConditions] = useState(['Type 2 Diabetes']);
  const [keywords, setKeywords] = useState(['Diabetes', 'Hypertension']);

  // Update functions
  const updateSymptoms = (newSymptoms) => setSymptoms(newSymptoms);
  const updateMedications = (newMedications) => setMedications(newMedications);
  const updateHistory = (newHistory) => setHistory(newHistory);
  const updateChronicConditions = (newConditions) => setChronicConditions(newConditions);
  const updateKeywords = (newKeywords) => setKeywords(newKeywords);

  // Function to update multiple data fields at once
  const updateAllPatientData = (newData) => {
    if (newData.symptoms) setSymptoms(newData.symptoms);
    if (newData.medications) setMedications(newData.medications);
    if (newData.history) setHistory(newData.history);
    if (newData.chronicConditions) setChronicConditions(newData.chronicConditions);
    if (newData.keywords) setKeywords(newData.keywords);
  };

  return (
    <PatientDataContext.Provider
      value={{
        symptoms,
        medications,
        history,
        chronicConditions,
        keywords,
        updateSymptoms,
        updateMedications,
        updateHistory,
        updateChronicConditions,
        updateKeywords,
        updateAllPatientData,  // Expose the new function
      }}
    >
      {children}
    </PatientDataContext.Provider>
  );
};

// Custom hook to access the context
export const usePatientData = () => useContext(PatientDataContext);