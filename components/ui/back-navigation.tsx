'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BackNavigation = () => {
  const router = useRouter();

  return (
    <div className="fixed top-8 flex w-full items-start space-x-2">
      <button onClick={() => router.back()}>
        <ChevronLeft size={32} />
      </button>
    </div>
  );
};
