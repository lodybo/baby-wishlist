import type { ReactNode } from 'react';

type Props = {
  children: ReactNode,
};

const MenuItem = ({ children }: Props) => (
  <li className="flex-1 flex justify-center">
    { children }
  </li>
);

export default MenuItem;
