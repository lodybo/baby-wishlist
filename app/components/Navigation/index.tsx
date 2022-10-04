import { Form, Link } from '@remix-run/react';
import classnames from 'classnames';
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

  /**
   * The navigation bar theme, used to indicate differences in profiles.
   */
  theme?: 'cyan' | 'lime' | 'gold';

  /**
   * The contrast for the logo.
   */
  logoContrast?: boolean;
};

const Navigation = ({ user, logoContrast = false, theme = 'cyan' }: Props) => {
  return (
    <nav
      className={classnames(
        'space-between top-0 z-20 mb-8 flex h-24 w-full flex-row items-center justify-center p-5 shadow-md',
        {
          'bg-cyan-500': theme === 'cyan',
          'bg-lime-500': theme === 'lime',
          'bg-gold-500': theme === 'gold',
        },
      )}
    >
      <h1 className="w-2/3 flex-auto text-2xl sm:w-1/3">
        <Link to="/">
          <Logo emblemContrast={logoContrast} />
        </Link>
      </h1>

      <Menu>
        <MenuItem>
          <Link to="/lijst">Lijst</Link>
        </MenuItem>

        {user && (
          <MenuItem>
            <span className="flex flex-row gap-2">
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
              <Button jumpOut secondary lighterContrast type="submit">
                Uitloggen
              </Button>
            </Form>
          ) : (
            <Link className="w-30 h-10 sm:w-20" to="/login?redirectTo=/">
              <Button useSpan jumpOut secondary lighterContrast>
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
