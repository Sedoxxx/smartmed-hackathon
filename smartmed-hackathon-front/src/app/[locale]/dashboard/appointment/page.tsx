'use client';

import { Table, TextInput, Group, Button, Paper, Title, rem } from '@mantine/core';
import { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';

const TodaysAppointments = () => {
  const styles = {
    header: {
      backgroundColor: '#f5f5f5',
      fontWeight: 600,
      borderBottom: `1px solid #ccc`,
    },
    row: {
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#f9fafb',
      },
    },
    paper: {
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '24px', // Add padding to the entire table
      width: '80vw', // Set the width to 80% of the viewport width
      margin: '0 auto', // Center the Paper component horizontally
      marginTop: '20px', // Add top margin
    },
    headerGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px', // Adds space when items wrap
    },
    title: {
      flex: 1, // Allows the title to take up extra space
      minWidth: '200px', // Prevents shrinking on smaller screens
    },
    controlsGroup: {
      display: 'flex',
      gap: '10px',
      flexShrink: 0, // Prevents shrinking of the controls
    },
    actionGroup: {
      display: 'flex',
      justifyContent: 'center', // Center the buttons inside the column
      gap: '8px', // Adds space between the buttons
    },
  };

  // Sample data for appointments
  const data = [
    { patientId: 'P001', patientName: 'John Doe', appointmentDate: '2024-11-23', status: 'Scheduled' },
    { patientId: 'P002', patientName: 'Jane Smith', appointmentDate: '2024-11-23', status: 'Completed' },
    { patientId: 'P003', patientName: 'Mary Johnson', appointmentDate: '2024-11-23', status: 'Scheduled' },
    { patientId: 'P004', patientName: 'James Brown', appointmentDate: '2024-11-23', status: 'Cancelled' },
  ];

  // State for search input, filtering, and sorting
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('patientName');
  const [sortOrder, setSortOrder] = useState('asc');

  // Handle search input change
  const handleSearchChange = (event) => setSearch(event.target.value);

  // Handle filtering by patient name or appointment date
  const handleFilterChange = (value) => setFilterBy(value);

  // Filter data based on search term
  const filteredData = data.filter((row) => {
    const searchLower = search.toLowerCase();
    return (
      row.patientId.toLowerCase().includes(searchLower) ||
      row.patientName.toLowerCase().includes(searchLower) ||
      row.appointmentDate.toLowerCase().includes(searchLower) ||
      row.status.toLowerCase().includes(searchLower)
    );
  });

  // Sort filtered data based on selected order
  const sortedData = filteredData.sort((a, b) => {
    const valA = a[filterBy];
    const valB = b[filterBy];
    if (filterBy === 'appointmentDate') {
      const dateA = new Date(valA);
      const dateB = new Date(valB);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
  });

  return (
    <Paper style={styles.paper}>
      {/* Header section with additional spacing between title and controls */}
      <Group style={styles.headerGroup} mb="md">
        <Title order={2}>Today's Appointments</Title>
        <Group spacing="xs" style={{ marginLeft: rem(32) }}>
          <TextInput
            placeholder="Search by Patient ID, Name, Date or Status"
            value={search}
            onChange={handleSearchChange}
            icon={<IconSearch />}
            style={{ width: '300px' }}
          />
          <Button variant="filled" color="blue">Create Appointment</Button>
        </Group>
      </Group>

      {/* Table */}
      <Table striped highlightOnHover style={{ minWidth: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Patient ID</th>
            <th style={{ textAlign: 'center' }}>Patient Name</th>
            <th style={{ textAlign: 'center' }}>Appointment Date</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{row.patientId}</td>
              <td style={{ textAlign: 'center' }}>{row.patientName}</td>
              <td style={{ textAlign: 'center' }}>{row.appointmentDate}</td>
              <td style={{ textAlign: 'center' }}>{row.status}</td>
              <td style={{ textAlign: 'center' }}>
                <Group style={styles.actionGroup}>
                  <Button variant="outline" size="xs">View</Button>
                  <Button variant="outline" size="xs">Edit</Button>
                  <Button variant="outline" size="xs" color="red">Cancel</Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default TodaysAppointments;
