import type { InputHTMLAttributes } from 'react';

export type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...props }: Props) {
  return (
    <input
      {...props}
      className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
    />
  );
}
