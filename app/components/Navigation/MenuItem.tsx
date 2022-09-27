import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MenuItem = ({ children }: Props) => (
  <li className="mx-0 flex flex-initial items-center justify-center text-2xl sm:mx-5 sm:text-base sm:last:mr-0">
    {children}
  </li>
);

export default MenuItem;
