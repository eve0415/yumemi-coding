import { api } from '@/api';
import type { FC } from 'react';
import PrefectureCheckbox from './Checkbox.client';

const Prefectures: FC = async () => {
  const { data } = await api.GET('/api/v1/prefectures', { cache: 'force-cache', next: { revalidate: 60 * 60 } });
  if (!data) return null;

  return (
    <div>
      {data.result.map(({ prefCode, prefName }) => (
        <PrefectureCheckbox key={prefCode} prefCode={prefCode}>
          {prefName}
        </PrefectureCheckbox>
      ))}
    </div>
  );
};

export default Prefectures;
