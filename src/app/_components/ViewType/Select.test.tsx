import type { getCompositionPerYear } from '@/app/actions';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, renderHook, screen, waitFor } from '@testing-library/react';
import type { FC, PropsWithChildren } from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import { ResasViewerProvider, useResasViewer } from '../ResasViewer';
import Select from './Select.client';

test('it should be able to change type', async () => {
  const fn = vi.fn<typeof getCompositionPerYear>(codes => Promise.resolve({ codes, boundaryYear: 2024, data: [] }));

  const wrapper: FC<PropsWithChildren> = ({ children }) => (
    <ResasViewerProvider fetchData={fn}>
      {children}
      <Select>
        <option value='total'>Total</option>
        <option value='young'>Young</option>
      </Select>
    </ResasViewerProvider>
  );
  const { result, rerender } = renderHook(() => useResasViewer(), { wrapper });

  const selectbox = screen.getByRole('combobox');
  expect(selectbox).toBeVisible();
  expect(selectbox).not.toBeDisabled();

  const options = screen.getAllByRole<HTMLOptionElement>('option');
  expect(options.at(0)?.selected).toBeTruthy();

  selectbox.click();
  expect(fn).not.toHaveBeenCalledOnce();

  fireEvent.change(selectbox, { target: { value: 'young' } });
  expect(options.at(0)?.selected).not.toBeTruthy();
  expect(options.at(1)?.selected).toBeTruthy();
  expect(selectbox).not.toBeDisabled();

  result.current.setSelected(1);
  rerender();
  expect(selectbox).toBeDisabled();
  expect(fn).toHaveBeenCalledOnce();

  await waitFor(() => expect(selectbox).not.toBeDisabled());

  // Change type again to ensure data fetching is triggered
  fireEvent.change(selectbox, { target: { value: 'total' } });
  expect(selectbox).toBeDisabled();
  expect(options.at(0)?.selected).toBeTruthy();
  expect(options.at(1)?.selected).not.toBeTruthy();
  expect(fn).toHaveBeenCalledTimes(2);
});

afterEach(() => {
  cleanup();
});
