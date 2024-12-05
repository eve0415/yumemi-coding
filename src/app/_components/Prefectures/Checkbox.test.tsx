import type { getCompositionPerYear } from '@/app/actions';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { ResasViewerProvider } from '../ResasViewer';
import PrefectureCheckbox from './Checkbox.client';

test('it should be able to clickable', () => {
  const fn = vi.fn<typeof getCompositionPerYear>(codes => Promise.resolve({ codes, boundaryYear: 2024, data: [] }));

  render(
    <ResasViewerProvider fetchData={fn}>
      <PrefectureCheckbox prefCode={1}>TEST1</PrefectureCheckbox>
    </ResasViewerProvider>,
  );

  expect(screen.getByLabelText('TEST1')).toBeInTheDocument();

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeDisabled();

  expect(fn).not.toHaveBeenCalledOnce();

  checkbox.click();
  expect(checkbox).toBeDisabled();
  expect(fn).toHaveBeenCalledOnce();
});

test('it should remove check when api returned without success', async () => {
  const fn = vi.fn<typeof getCompositionPerYear>(() => Promise.resolve({ codes: [], boundaryYear: 2024, data: [] }));

  render(
    <ResasViewerProvider fetchData={fn}>
      <PrefectureCheckbox prefCode={2}>TEST2</PrefectureCheckbox>
    </ResasViewerProvider>,
  );

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeDisabled();

  expect(fn).not.toHaveBeenCalledOnce();

  checkbox.click();
  expect(checkbox).toBeDisabled();

  await waitFor(() => expect(checkbox).not.toBeDisabled());
  expect(fn).toHaveBeenCalledOnce();
});

afterEach(() => {
  cleanup();
});
