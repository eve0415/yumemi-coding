import type { FC } from 'react';
import Prefectures from './_components/Prefectures';

const TopPage: FC = () => {
  return (
    <>
      <h1>フロントエンドコーディング試験</h1>

      <p>都道府県</p>
      <Prefectures />
    </>
  );
};

export default TopPage;
