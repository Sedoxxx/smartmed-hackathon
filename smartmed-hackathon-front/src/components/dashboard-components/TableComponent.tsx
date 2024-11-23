'use client';

import { Table, TextInput, Group, Select, Paper, Title } from '@mantine/core';
import { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';

const TableComponent = () => {
  // Sample data for the table related to SEMD
const data = [
    { type: 'Consultation Protocol', author: 'Dr. Emily Carter', keywords: 'Endocrinology, Diabetes, Metformin', issueDate: '2024-11-23' },
    { type: 'Discharge Summary', author: 'Dr. Michael Johnson', keywords: 'Surgery, Appendectomy, Recovery', issueDate: '2023-05-15' },
    { type: 'Follow-up Consultation', author: 'Dr. Sarah Lee', keywords: 'Hypertension, Blood Pressure, Lifestyle Changes', issueDate: '2024-11-10' },
    { type: 'Medical Examination Report', author: 'Dr. David Williams', keywords: 'Blood Test, Cholesterol, Health Check', issueDate: '2023-12-01' },
  ];
  

  // State for search input, filtering, and sorting
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('type'); // Default filter by type
  const [sortOrder, setSortOrder] = useState('desc'); // Default descending order

  // Handle search input change
  const handleSearchChange = (event) => setSearch(event.target.value);

  // Handle filtering by type or issueDate
  const handleFilterChange = (value) => setFilterBy(value);

  // Filter data based on search term across all fields
  const filteredData = data.filter((row) => {
    const searchLower = search.toLowerCase();
    return (
      row.type.toLowerCase().includes(searchLower) ||
      row.author.toLowerCase().includes(searchLower) ||
      row.keywords.toLowerCase().includes(searchLower) ||
      row.issueDate.toLowerCase().includes(searchLower)
    );
  });

  // Sort filtered data based on selected order
  const sortedData = filteredData.sort((a, b) => {
    const valA = a[filterBy];
    const valB = b[filterBy];

    if (filterBy === 'issueDate') {
      // Handle date sorting
      const dateA = new Date(valA);
      const dateB = new Date(valB);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      // Handle string sorting for 'type'
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
  });

  return (
    <Paper shadow="xs" padding="lg">
      {/* Title and Search/Filter Section */}
      <Group position="apart" mb="md" align="center">
        <Title order={2}>SEMD Records</Title> {/* Add title here */}
        
        <Group spacing="xs">
          <TextInput
            placeholder={`Search across all fields`}
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

      {/* Table */}
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Author</th>
            <th>Keywords</th>
            <th>Issue Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
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
