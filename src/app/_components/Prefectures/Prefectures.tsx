import { api } from '@/api';
import type { FC } from 'react';
import PrefectureCheckbox from './Checkbox.client';

const Prefectures: FC = async () => {
  const { data } = await api.GET('/api/v1/prefectures', { cache: 'force-cache', next: { revalidate: 60 * 60 } });
  if (!data) return null;

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.24),1fr))] gap-x-4'>
      {data.result.map(({ prefCode, prefName }) => (
        <PrefectureCheckbox key={prefCode} prefCode={prefCode}>
          {prefName}
        </PrefectureCheckbox>
      ))}
    </div>
  );
};

export default Prefectures;
