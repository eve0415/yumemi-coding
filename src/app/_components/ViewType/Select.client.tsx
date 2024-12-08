'use client';

import type { FC, PropsWithChildren } from 'react';
import { useResasViewer } from '../ResasViewer';

const Select: FC<PropsWithChildren> = ({ children }) => {
  const { type, setType, isUpdating } = useResasViewer();

  return (
    <select className='w-fit rounded-xs border border-gray-400' value={type} onChange={e => setType(e.target.value)} disabled={isUpdating}>
      {children}
    </select>
  );
};

export default Select;
