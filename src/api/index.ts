import { taintUniqueValue } from 'next/dist/server/app-render/rsc/taint';
import createClient from 'openapi-fetch';
import type { paths } from './resas';

if (!process.env.YUMEMI_FRONT_CODING_EXAM_API_KEY) {
  throw new Error('YUMEMI_FRONT_CODING_EXAM_API_KEY is required');
}

export const api = createClient<paths>({
  baseUrl: process.env.YUMEMI_FRONT_CODING_EXAM_API_URL,
  headers: { 'X-API-KEY': process.env.YUMEMI_FRONT_CODING_EXAM_API_KEY },
  // revalidate every hour
  next: { revalidate: 60 * 60 },
});

if (process.env.NODE_ENV === 'production') {
  if (process.env.YUMEMI_FRONT_CODING_EXAM_API_URL) taintUniqueValue('Do not expose sonmin api url', api, process.env.YUMEMI_FRONT_CODING_EXAM_API_URL);
  if (process.env.YUMEMI_FRONT_CODING_EXAM_API_KEY) taintUniqueValue('Do not expose sonmin api key', api, process.env.YUMEMI_FRONT_CODING_EXAM_API_KEY);
}
