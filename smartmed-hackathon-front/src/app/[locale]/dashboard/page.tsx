'use client';

import Image from 'next/image';
import { NavbarNested } from '@/components/dashboard-components/NavbarNested';
import PatientDashboard from '@/components/dashboard-components/PatientDashboard';
import { MantineProvider } from '@mantine/core'; // Ensure MantineProvider wraps your app

export default function Home() {
  return (
    <MantineProvider>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-1/4 min-w-[250px]">
          <NavbarNested />
        </div>
        
       
      </div>
    </MantineProvider>
  );
}
