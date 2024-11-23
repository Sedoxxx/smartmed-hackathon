'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { Select } from '@mantine/core';


const languageOptions = [
  { value: 'en', label: 'English', flag: 'GB' }, // GB for English flag
  { value: 'ru', label: 'Russian', flag: 'RU' }, // ID for Indonesia flag
];

export function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const pathname = usePathname();

  const activeLabel =
  languageOptions.find((option) => option.value === localActive)?.label || 'Select language';


  const onSelectChange = (value: string | null) => {
    if (!value) return;
  
    startTransition(() => {
      const currentPath = pathname; // Current route path
      const segments = currentPath.split('/'); // Split the path into segments
  
      // Replace the desired segment, assuming the locale is the first segment
      segments[1] = value; // Replace the second segment with the new locale
  
      const updatedPath = segments.join('/'); // Reconstruct the path
  
      router.replace(updatedPath); // Navigate to the new path
    });
  };
  return (
    <Select
      value={localActive }
      onChange={onSelectChange}
      data={languageOptions.map((option) => ({
        value: option.value,
        label: option.label,
      }))}
      disabled={isPending}
      radius="xl"
      size="md"
      style={{ width: '120px' }}
    //   placeholder="Select language"
      styles={{
        
        input: {
          padding: '0.25rem 0.75rem',
          fontSize: '1rem',
          cursor: isPending ? 'not-allowed' : 'pointer',
        },
      }}
    //   label="Change Language"
    />
  );
}
