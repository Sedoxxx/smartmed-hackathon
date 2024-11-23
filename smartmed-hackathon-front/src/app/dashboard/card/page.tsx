'use client';

import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import PatientDashboard from '@/components/dashboard-components/PatientDashboard';
import TableComponent from '@/components/dashboard-components/TableComponent'; // Import the TableComponent
import MedicalReport from '@/components/dashboard-components/MedicalReport'; // Import the MedicalReport component
import { NavbarNested } from '@/components/dashboard-components/NavbarNested'; // Import the Navbar component
import { IconMenu2 } from '@tabler/icons-react';
import { PatientDataProvider } from '@/context/PatientDataContext';

export default function Card() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <PatientDataProvider>
    <MantineProvider>
      <div className="h-screen flex "> {/* Flex container with gap-x-6 for spacing between columns */}
        
        {/* Navbar */}
        <NavbarNested isCollapsed={isNavbarCollapsed} />

        {/* Left Side: Dashboard and Table */}
        <div className={`flex-1 p-6 pr-0 overflow-y-auto ${isNavbarCollapsed ? 'ml-10 mr-10' : ''}`} style={{ height: '100vh' }}>
          <div className="mb-6">
            <PatientDashboard />
          </div>
          
          <TableComponent />
        </div>
        
        {/* Right Side: Medical Report */}
        <div className="flex-1 w-1/2 p-6 pl-0"> {/* Take up 1/3 width */}
          <MedicalReport /> {/* Include the MedicalReport component here */}
        </div>

        {/* Toggle Button for Navbar */}
        <button
          onClick={toggleNavbar}
          className="absolute top-4 left-4 bg-gray-700 text-white p-2 rounded-full"
        >
          <IconMenu2 size={24} />
        </button>
      </div>
    </MantineProvider>
    </PatientDataProvider>
  );
}
