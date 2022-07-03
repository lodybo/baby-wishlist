import type { ReactNode } from 'react';

export type Props = {
  caption: string;
  children: ReactNode;
};

export default function Label({ caption, children }: Props) {
  return (
    <label>
      <p className="block text-sm font-medium text-gray-700">{caption}</p>
      {children}
    </label>
  );
}
