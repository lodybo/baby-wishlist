import type { ReactNode } from 'react';
import { useState } from 'react';
import Icon from '~/components/Icon';

type Props = {
  children: ReactNode;
};

const Menu = ({ children }: Props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <>
      <button
        className="block h-full w-24 text-lg sm:hidden"
        onClick={toggleMenu}
      >
        <Icon name="ellipsis-vertical" />
      </button>

      <ul className="hidden h-full w-1/3 flex-auto flex-row justify-end sm:flex sm:w-2/3">
        {children}
      </ul>

      <ul
        className={`absolute block sm:hidden ${
          menuIsOpen ? 'top-24' : '-top-72'
        } space-between focus:none z-10 flex w-full flex-col gap-5 bg-slate-200 p-8 shadow-inner transition-all duration-300 focus-visible:ring-2 motion-reduce:transition-none`}
      >
        {children}
      </ul>
    </>
  );
};

export default Menu;
