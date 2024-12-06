'use client';

import type { FC } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useResasViewer } from '../ResasViewer';

const Charts: FC = () => {
  const { data } = useResasViewer();

  return (
    <ResponsiveContainer className='min-h-[400px] w-[80%] mb-4'>
      <LineChart margin={{ left: 50, right: 60, top: 30 }} data={data?.data} accessibilityLayer>
        <XAxis dataKey='year' label={{ value: '年度', position: 'right', offset: 25 }} />
        <YAxis label={{ value: '人口数', position: 'top', offset: 10 }} tickFormatter={(t: number) => t.toLocaleString()} />

        <Tooltip labelClassName='text-black' labelFormatter={(l: number) => `${l}年`} formatter={(f: number) => `${f.toLocaleString()}人`} />
        <Legend formatter={(t: number) => t.toLocaleString()} />

        {Object.keys(data?.data[0] ?? {})
          .filter(key => key !== 'year')
          .map(name => (
            <Line key={name} type='monotone' dataKey={name} name={name} />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Charts;
