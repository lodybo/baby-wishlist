import { Form, Link } from '@remix-run/react';
import type { User } from '~/models/user.server';

import Menu from './Menu';
import MenuItem from './MenuItem';
import Logo from '~/components/Logo';
import Button from '~/components/Button';

export type Props = {
  /**
   * The user, if available
   */
  user?: User;
};

const Navigation = ({ user}: Props) => {
  return (
    <nav className="space-between sticky mb-8 shadow-md top-0 z-20 flex h-24 w-full flex-row items-center justify-center bg-slate-100 p-5">
      <h1 className="w-2/3 flex-auto text-2xl sm:w-1/3">
        <Link to="/">
          <Logo />
        </Link>
      </h1>

      <Menu>
        <MenuItem>
          <Link to="/lijst">Lijst</Link>
        </MenuItem>

        <MenuItem>Suggesties</MenuItem>

        <MenuItem>
          { user ? (
            <Form
              className="flex flex-row items-center gap-5"
              action="/logout"
              method="post"
            >
              <Link to="/profiel">
                <span className="text-slate-600">Hallo { user.name }!</span>
              </Link>

              <Button jumpOut type="submit">
                Uitloggen
              </Button>
            </Form>
          ) : (
            <Link className="h-10 w-20" to="/login?redirectTo=/">
              <Button useSpan jumpOut primary>
                Inloggen
              </Button>
            </Link>
          ) }
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default Navigation;
