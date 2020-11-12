import { ChangeEvent } from 'react';

export type AuthInputProps = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
