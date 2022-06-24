import type { ReactNode } from 'react';

type Props = {
  children: ReactNode,
};

const Menu = ({ children }: Props) => (
  <ul className="w-2/3 list-style-none flex-auto flex flex-row space-between">
    { children }
  </ul>
);

export default Menu;
