import type { FC } from 'react';
import Charts from './_components/Charts';
import Prefectures from './_components/Prefectures';
import { ResasViewerProvider } from './_components/ResasViewer';
import { getCompositionPerYear } from './actions';

const TopPage: FC = () => {
  return (
    <>
      <h1>フロントエンドコーディング試験</h1>

      <ResasViewerProvider fetchData={getCompositionPerYear}>
        <p>都道府県</p>
        <Prefectures />

        <Charts />
      </ResasViewerProvider>
    </>
  );
};

export default TopPage;
