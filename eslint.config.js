import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...compat.extends('airbnb-base'),
  {
    rules: {
      quotes: ['error', 'single'],
      // Add any other custom rules here
    }
  }
];
