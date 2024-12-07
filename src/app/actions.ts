'use server';

import { api, PopulationType } from '@/api';

const isPopulationType = (type: string): type is keyof typeof PopulationType => Object.keys(PopulationType).includes(type);

export const getCompositionPerYear = async (prefCode: number[], populationType: string) => {
  const { data: prefectures } = await api.GET('/api/v1/prefectures');
  if (!prefectures) return null;

  // Remove duplicates & Check if the prefecture code exists
  // Shouldn't happen normally, but just in case if user tries to manipulate the request
  const prefCodes = [...new Set(prefCode)];
  const validCodes = prefectures.result.filter(({ prefCode: code }) => prefCodes.includes(code));

  const results = await Promise.allSettled(
    validCodes.map(async c => ({
      ...c,
      data: await api.GET('/api/v1/population/composition/perYear', {
        params: { query: { prefCode: `${c.prefCode}` } },
      }),
    })),
  );
  const result = results
    .filter(r => r.status === 'fulfilled')
    .map(({ value }) => (value.data.data?.result ? { code: value.prefCode, name: value.prefName, result: value.data.data.result } : null))
    .filter(Boolean);

  // Check if boundary year is the same
  // If not, we would use the oldest boundary year
  const boundary = result.map(({ result }) => result.boundaryYear).sort()[0];
  // Probably shouldn't happen, but just in case
  if (!boundary) return null;

  const data = result.filter(({ result }) => result.boundaryYear === boundary);

  const dataByYear = new Map<number, { year: number; [key: string]: number }>();
  for (const { name, result } of data) {
    for (const { year, value } of result.data.find(({ label }) => label === PopulationType[isPopulationType(populationType) ? populationType : 'total'])
      ?.data ?? []) {
      const existing = dataByYear.get(year);
      dataByYear.set(year, { year, ...existing, [name]: value });
    }
  }

  return {
    boundaryYear: boundary,
    codes: data.map(({ code }) => code),
    data: dataByYear.values().toArray(),
  };
};
