'use client';

import { Toaster } from 'react-hot-toast';

export const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />
  );
};
