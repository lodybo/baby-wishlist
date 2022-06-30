import Menu from './Menu';
import MenuItem from './MenuItem';
import Icon from '~/components/Icon';

const Navigation = () => (
  <nav className="w-screen h-24 top-0 p-5 mb-8 bg-slate-100 sticky shadow-md flex flex-row space-between items-center justify-center z-20">
    <h1 className="text-2xl flex-auto w-2/3 sm:w-1/3">
      <Icon className="mr-2" name="robot" />
      Cody's wensjes
    </h1>

    <Menu>
      <MenuItem>
        Lijst
      </MenuItem>

      <MenuItem>
        Suggesties
      </MenuItem>

      <MenuItem>
        <span className="rounded bg-slate">Inloggen</span>
      </MenuItem>
    </Menu>
  </nav>
);

export default Navigation;
