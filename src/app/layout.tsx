import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import './global.css';

export const metadata: Metadata = {
  title: 'フロントエンドコーディング試験',
  robots: {
    index: false,
    noarchive: true,
    nocache: true,
  },
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='ja'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
