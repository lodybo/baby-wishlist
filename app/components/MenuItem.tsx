import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MenuItem = ({ children }: Props) => (
  <li className="mx-0 flex flex-initial items-center justify-center text-3xl sm:mx-5 sm:text-2xl sm:last:mr-0">
    {children}
  </li>
);

export default MenuItem;
