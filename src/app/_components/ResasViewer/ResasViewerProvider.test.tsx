import type { getCompositionPerYear } from '@/app/actions';
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import type { FC, PropsWithChildren } from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import { ResasViewerProvider, useResasViewer } from './ResasViewerProvider';

test('it should try to update `isUpdating` fromo `useTransition`', () => {
  const fn = vi.fn<typeof getCompositionPerYear>(codes => Promise.resolve({ codes, boundaryYear: 2024, data: [] }));

  const wrapper: FC<PropsWithChildren> = ({ children }) => <ResasViewerProvider fetchData={fn}>{children}</ResasViewerProvider>;
  const { result } = renderHook(() => useResasViewer(), { wrapper });

  expect(result.current.isUpdating).toBeFalsy();

  act(() => {
    result.current.setSelected(1);
  });

  expect(result.current.isUpdating).toBeTruthy();
});

test('it should get data successfully', async () => {
  const fn = vi.fn<typeof getCompositionPerYear>(codes => Promise.resolve({ codes, boundaryYear: 2024, data: [] }));

  const wrapper: FC<PropsWithChildren> = ({ children }) => <ResasViewerProvider fetchData={fn}>{children}</ResasViewerProvider>;
  const { result, rerender } = renderHook(() => useResasViewer(), { wrapper });

  act(() => {
    result.current.setSelected(1);
  });

  rerender();
  await waitFor(() => expect(result.current.isUpdating).toBeFalsy());

  expect(fn).toHaveBeenCalledOnce();

  expect(result.current.selected).toStrictEqual([1]);
  expect(result.current.data).toStrictEqual({ codes: [1], boundaryYear: 2024, data: [] });
});

afterEach(() => {
  cleanup();
});
