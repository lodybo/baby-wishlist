import { Form, Link } from '@remix-run/react';
import Icon from '~/components/Icon';
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

const Navigation = ({ user }: Props) => {
  return (
    <nav className="space-between sticky top-0 z-20 mb-8 flex h-24 w-full flex-row items-center justify-center bg-slate-100 p-5 shadow-md">
      <h1 className="w-2/3 flex-auto text-2xl sm:w-1/3">
        <Link to="/">
          <Logo />
        </Link>
      </h1>

      <Menu>
        <MenuItem>
          <Link to="/lijst">Lijst</Link>
        </MenuItem>

        {user && (
          <MenuItem>
            <span className="flex flex-row gap-2">
              <span className="text-slate-600">Hallo {user.name}!</span>

              <Link to="/profiel">
                <Icon name="user" />
              </Link>
            </span>
          </MenuItem>
        )}

        <MenuItem>
          {user ? (
            <Form
              className="flex flex-row items-center gap-5"
              action="/logout"
              method="post"
            >
              <Button jumpOut type="submit">
                Uitloggen
              </Button>
            </Form>
          ) : (
            <Link className="w-30 h-10 sm:w-20" to="/login?redirectTo=/">
              <Button useSpan jumpOut primary>
                Inloggen
              </Button>
            </Link>
          )}
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default Navigation;
