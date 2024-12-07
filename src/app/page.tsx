import type { FC } from 'react';
import Charts from './_components/Charts';
import Prefectures from './_components/Prefectures';
import { ResasViewerProvider } from './_components/ResasViewer';
import ViewType from './_components/ViewType';
import { getCompositionPerYear } from './actions';

const TopPage: FC = () => {
  return (
    <>
      <h1 className='flex border-b justify-center p-2'>フロントエンドコーディング試験</h1>

      <ResasViewerProvider fetchData={getCompositionPerYear}>
        <div className='mx-8 mt-4'>
          <p className='border mb-4 w-fit p-2'>都道府県</p>
          <Prefectures />

          <div className='flex mt-4 justify-end'>
            <ViewType />
          </div>
        </div>

        <Charts />
      </ResasViewerProvider>
    </>
  );
};

export default TopPage;
