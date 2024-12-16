'use client';

import type { FC } from 'react';

const ErrorPage: FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ reset }) => {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <h1 className='text-3xl'>Unknown Error Occurred</h1>
      <button type='reset' className='ml-4 rounded-md bg-blue-300 px-4 py-2' onClick={reset}>
        Reload
      </button>
    </div>
  );
};

export default ErrorPage;
