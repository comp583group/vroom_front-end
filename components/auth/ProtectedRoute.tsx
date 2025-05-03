'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};



export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access'); // assuming you store JWT here

    if (!token) {
      router.push('/login');
    } else {
        setChecking(false);
    }
  }, [router]);

  if (checking) return <div className="text-center p-6">Loading...</div>;
  return <>{children}</>;
}
