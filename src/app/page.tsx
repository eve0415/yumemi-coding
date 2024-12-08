import type { FC } from 'react';
import Charts from './_components/Charts';
import Prefectures from './_components/Prefectures';
import { ResasViewerProvider } from './_components/ResasViewer';
import ViewType from './_components/ViewType';
import { getCompositionPerYear } from './actions';

const TopPage: FC = () => {
  return (
    <>
      <h1 className='flex justify-center border-b p-2'>フロントエンドコーディング試験</h1>

      <ResasViewerProvider fetchData={getCompositionPerYear}>
        <div className='mx-8 mt-4'>
          <p className='mb-4 w-fit border p-2'>都道府県</p>
          <Prefectures />

          <div className='mt-4 flex justify-end'>
            <ViewType />
          </div>
        </div>

        <Charts />
      </ResasViewerProvider>
    </>
  );
};

export default TopPage;
