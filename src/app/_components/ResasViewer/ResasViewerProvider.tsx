'use client';

import type { getCompositionPerYear } from '@/app/actions';
import { type FC, type PropsWithChildren, createContext, use, useCallback, useState, useTransition } from 'react';

interface ResasViewerContext {
  selected: number[];
  setSelected: (selected: number) => void;

  type: string;
  setType: (type: string) => void;

  isUpdating: boolean;

  data: Awaited<ReturnType<typeof getCompositionPerYear>>;
}

const ResasViewer = createContext<ResasViewerContext | null>(null);

export const ResasViewerProvider: FC<PropsWithChildren<{ fetchData: typeof getCompositionPerYear }>> = ({ children, fetchData }) => {
  const [type, setType] = useState<string>('total');
  const [data, setData] = useState<ResasViewerContext['data']>(null);
  const [selectedPrefs, setSelectedPrefs] = useState<ResasViewerContext['selected']>([]);
  const [isUpdating, startTransition] = useTransition();

  const onSelectionChange = useCallback(
    (selected: number) => {
      // Ignore if we're already updating
      if (isUpdating) return;

      const selection = selectedPrefs.includes(selected) ? selectedPrefs.filter(code => code !== selected) : [...selectedPrefs, selected];
      if (!selection.length) {
        setData(null);
        setSelectedPrefs(selection);
        return;
      }

      startTransition(async () => {
        const res = await fetchData(selection, type);
        if (!res) return;

        setData(res);
        setSelectedPrefs(res.codes);
      });
    },
    [isUpdating, selectedPrefs, fetchData, type],
  );

  const onTypeChange = useCallback(
    (type: string) => {
      // Ignore if we're already updating
      if (isUpdating) return;

      setType(type);

      if (!selectedPrefs.length) return;

      startTransition(async () => {
        const res = await fetchData(selectedPrefs, type);
        if (!res) return;

        setData(res);
      });
    },
    [isUpdating, selectedPrefs, fetchData],
  );

  return (
    <ResasViewer value={{ selected: selectedPrefs, setSelected: onSelectionChange, type, setType: onTypeChange, isUpdating, data }}>{children}</ResasViewer>
  );
};

export const useResasViewer = () => {
  const context = use(ResasViewer);
  if (!context) throw new Error('useResasViewer must be used within ResasViewerProvider');

  return context;
};
