import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// @ts-ignore
import reactCompiler from 'eslint-plugin-react-compiler';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

export default tseslint.config(
  { ignores: ['.next', 'src/api/*.d.ts'] },
  ...compat.extends('next/core-web-vitals'),
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: { 'react-compiler': reactCompiler },
  },
  {
    rules: {
      'react-compiler/react-compiler': 'error',
      'react/no-unknown-property': 'error',
    },
  },
  ...tseslint.configs.recommendedTypeCheckedOnly,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
