import type { ReactNode } from 'react';

type Props = {
  id: string;
  children: ReactNode;
};

export default function ErrorText({ id, children }: Props) {
  return (
    <p className="pt-1 text-rose-700" id={id}>
      {children}
    </p>
  );
}
