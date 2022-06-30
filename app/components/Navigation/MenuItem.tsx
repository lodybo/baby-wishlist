import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MenuItem = ({ children }: Props) => (
  <li className="flex flex-1 items-center justify-center text-2xl sm:text-base">
    {children}
  </li>
);

export default MenuItem;
