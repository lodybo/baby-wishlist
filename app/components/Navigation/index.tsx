import { Form, Link } from '@remix-run/react';
import type { User } from '@prisma/client';

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

const Navigation = ({ user }: Props) => (
  <nav className="space-between sticky top-0 z-20 mb-8 flex h-24 w-full flex-row items-center justify-center bg-slate-100 p-5 shadow-md">
    <h1 className="w-2/3 flex-auto text-2xl sm:w-1/3">
      <Link to="/">
        <Logo />
      </Link>
    </h1>

    <Menu>
      <MenuItem>Lijst</MenuItem>

      <MenuItem>Suggesties</MenuItem>

      <MenuItem>
        {user ? (
          <Form
            className="ml-5 flex flex-row items-center"
            action="/logout"
            method="post"
          >
            <span className="mr-5 text-slate-600">Hallo {user.name}!</span>

            <div className="h-10 w-20">
              <Button jumpOut type="submit">
                Uitloggen
              </Button>
            </div>
          </Form>
        ) : (
          <Link className="h-10 w-20" to="/login?redirectTo=/">
            <Button useSpan jumpOut primary>
              Inloggen
            </Button>
          </Link>
        )}
      </MenuItem>
    </Menu>
  </nav>
);

export default Navigation;
