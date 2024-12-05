import type { getCompositionPerYear } from '@/app/actions';
import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { ResasViewerProvider } from '../ResasViewer';
import Charts from './Charts.client';

test('it should render properly', () => {
  const fn = vi.fn<typeof getCompositionPerYear>(codes => Promise.resolve({ codes, boundaryYear: 2024, data: [] }));

  const { container } = render(
    <ResasViewerProvider fetchData={fn}>
      <Charts />
    </ResasViewerProvider>,
  );

  expect(container.firstChild).toHaveClass('recharts-responsive-container');
});

afterEach(() => {
  cleanup();
});
