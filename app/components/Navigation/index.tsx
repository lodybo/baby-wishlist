import Menu from './Menu';
import MenuItem from './MenuItem';
import Icon from '~/components/Icon';

const Navigation = () => (
  <nav className="space-between sticky top-0 z-20 mb-8 flex h-24 w-screen flex-row items-center justify-center bg-slate-100 p-5 shadow-md">
    <h1 className="w-2/3 flex-auto text-2xl sm:w-1/3">
      <Icon className="mr-2" name="robot" />
      Cody's wensjes
    </h1>

    <Menu>
      <MenuItem>Lijst</MenuItem>

      <MenuItem>Suggesties</MenuItem>

      <MenuItem>
        <span className="bg-slate rounded">Inloggen</span>
      </MenuItem>
    </Menu>
  </nav>
);

export default Navigation;
