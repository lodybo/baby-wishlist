import { Form, Link } from '@remix-run/react';
import Menu from './Menu';
import MenuItem from './MenuItem';
import Logo from '~/components/Logo';
import Button from '~/components/Button';

export type Props = {
  /**
   * Whether the user is already logged in.
   */
  isLoggedIn?: boolean;
};

const Navigation = ({ isLoggedIn = false }: Props) => (
  <nav className="space-between sticky top-0 z-20 mb-8 flex h-24 w-screen flex-row items-center justify-center bg-slate-100 p-5 shadow-md">
    <h1 className="w-2/3 flex-auto text-2xl sm:w-1/3">
      <Link to="/">
        <Logo />
      </Link>
    </h1>

    <Menu>
      <MenuItem>Lijst</MenuItem>

      <MenuItem>Suggesties</MenuItem>

      <MenuItem>
        {isLoggedIn ? (
          <Form action="/logout" method="post">
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
