'use client';

import { Table, TextInput, Group, Select, Paper, Title, rem } from '@mantine/core';
import { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';

const TableComponent = () => {
  // Define custom styles directly using inline CSS and Mantine's theming
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
  };

  const data = [
    { type: 'Consultation Protocol', author: 'Dr. Emily Carter', keywords: 'Endocrinology, Diabetes, Metformin', issueDate: '2024-11-23' },
    { type: 'Discharge Summary', author: 'Dr. Michael Johnson', keywords: 'Surgery, Appendectomy, Recovery', issueDate: '2023-05-15' },
    { type: 'Follow-up Consultation', author: 'Dr. Sarah Lee', keywords: 'Hypertension, Blood Pressure, Lifestyle Changes', issueDate: '2024-11-10' },
    { type: 'Medical Examination Report', author: 'Dr. David Williams', keywords: 'Blood Test, Cholesterol, Health Check', issueDate: '2023-12-01' },
  ];

  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('type');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleFilterChange = (value) => setFilterBy(value);

  const filteredData = data.filter((row) => {
    const searchLower = search.toLowerCase();
    return (
      row.type.toLowerCase().includes(searchLower) ||
      row.author.toLowerCase().includes(searchLower) ||
      row.keywords.toLowerCase().includes(searchLower) ||
      row.issueDate.toLowerCase().includes(searchLower)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    const valA = a[filterBy];
    const valB = b[filterBy];
    if (filterBy === 'issueDate') {
      const dateA = new Date(valA);
      const dateB = new Date(valB);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
  });

  return (
    <Paper style={styles.paper}>
      <Group style={styles.headerGroup} mb="md">
        <Title order={2} style={styles.title}>SEMD Records</Title>
        <Group style={styles.controlsGroup}>
          <TextInput
            placeholder="Search across all fields"
            value={search}
            onChange={handleSearchChange}
            icon={<IconSearch />}
            style={{ width: '300px' }}
          />
          <Select
            value={filterBy}
            onChange={handleFilterChange}
            data={[
              { value: 'type', label: 'Type' },
              { value: 'issueDate', label: 'Issue Date' },
            ]}
            style={{ width: '150px' }}
            placeholder="Filter By"
          />
        </Group>
      </Group>

      <Table striped highlightOnHover>
        <thead>
          <tr style={styles.header}>
            <th>Type</th>
            <th>Author</th>
            <th>Keywords</th>
            <th>Issue Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index} style={styles.row}>
              <td>{row.type}</td>
              <td>{row.author}</td>
              <td>{row.keywords}</td>
              <td>{row.issueDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default TableComponent;