'use client'

import Image from "next/image";
import { NavbarNested } from "@/components/dashboard-components/NavbarNested";

export default function Home() {
  return (
    <div className="min-h-screen ">
        <NavbarNested />
    </div>
  );
}
