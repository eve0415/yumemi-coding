'use client';

import type { FC } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useResasViewer } from '../ResasViewer';

const Charts: FC = () => {
  const { data } = useResasViewer();

  return (
    <ResponsiveContainer className='min-h-[400px] w-[80%]'>
      <LineChart margin={{ left: 50, right: 50, top: 30 }} data={data?.data} accessibilityLayer>
        <XAxis dataKey='year' unit='年' />
        <YAxis dx={0} label={{ value: '人口数', position: 'top', offset: 10 }} />

        <Tooltip labelClassName='text-black' />
        <Legend />

        {Object.keys(data?.data[0] ?? {})
          .filter(key => key !== 'year')
          .map(name => (
            <Line key={name} type='monotone' dataKey={name} name={name} dot={false} />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Charts;
