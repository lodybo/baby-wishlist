import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MenuItem = ({ children }: Props) => (
  <li className="mx-5 flex flex-initial items-center justify-center text-2xl last:mr-0 sm:text-base">
    {children}
  </li>
);

export default MenuItem;
