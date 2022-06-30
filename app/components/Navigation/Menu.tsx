import type { ReactNode } from 'react';
import { useState } from "react";
import Icon from "~/components/Icon";

type Props = {
  children: ReactNode,
};

const Menu = ({ children }: Props) => {
  const [ menuIsOpen, setMenuIsOpen ] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <>
      <button className="block sm:hidden h-full w-24 text-lg" onClick={toggleMenu}>
        <Icon name="ellipsis-vertical" />
      </button>

      <ul className="hidden w-1/3 sm:w-2/3 flex-auto sm:flex flex-row space-between">
        { children }
      </ul>

      <div
        className={ `block sm:hidden absolute ${ menuIsOpen ? 'top-24' : '-top-72' } transition-all duration-300 motion-reduce:transition-none w-full h-64 bg-slate-200 p-8 shadow-inner flex flex-col space-between z-10 focus:none focus-visible:ring-2` }>
        { children }
      </div>
    </>
  );
};

export default Menu;
