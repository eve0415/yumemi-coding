import { PopulationType } from '@/api';
import type { FC } from 'react';
import Select from './Select.client';

const ViewType: FC = () => {
  return (
    <Select>
      {Object.keys(PopulationType).map(key => (
        <option key={key} value={key}>
          {PopulationType[key as keyof typeof PopulationType]}
        </option>
      ))}
    </Select>
  );
};

export default ViewType;
