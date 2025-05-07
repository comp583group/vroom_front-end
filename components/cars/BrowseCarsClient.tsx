"use client";

import { useSearchParams } from 'next/navigation';
import BrowseCars from '@/components/cars/BrowseCarsImpl'; 


export default function BrowseCarsClient() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  return <BrowseCars searchQuery={searchQuery} />;
}