'use client';
import type { FC, PropsWithChildren } from 'react';

const PrefectureCheckbox: FC<PropsWithChildren> = ({ children }) => {
  return (
    <label>
      <input type='checkbox' />

      {children}
    </label>
  );
};

export default PrefectureCheckbox;
