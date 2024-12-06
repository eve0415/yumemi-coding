'use client';

import type { FC, PropsWithChildren } from 'react';
import { useResasViewer } from '../ResasViewer';

const PrefectureCheckbox: FC<PropsWithChildren<{ prefCode: number }>> = ({ children, prefCode }) => {
  const { selected, setSelected, isUpdating } = useResasViewer();

  return (
    <label className='flex aria-disabled:cursor-progress items-center disabled:opacity-50 gap-x-2' aria-disabled={isUpdating}>
      <input type='checkbox' checked={selected.includes(prefCode)} onChange={() => setSelected(prefCode)} disabled={isUpdating} />

      {children}
    </label>
  );
};

export default PrefectureCheckbox;
