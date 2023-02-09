import { Form, Link, useLocation } from '@remix-run/react';

import Menu from 'app/components/Menu';
import MenuItem from 'app/components/MenuItem';
import classnames from 'classnames';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import Logo from '~/components/Logo';
import type { Theme } from '~/types/Theme';
import { useOptionalUser } from '~/utils';

const Navigation = () => {
  const user = useOptionalUser();
  const location = useLocation();

  let theme: Theme = 'cyan';

  if (location.pathname.startsWith('/admin')) {
    theme = 'gold';
  } else if (location.pathname.startsWith('/profiel')) {
    theme = 'lime';
  }

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
      <h1 className="w-2/3 flex-auto text-3xl sm:w-1/3">
        <Link to="/">
          <Logo emblemContrast={theme === 'gold'} />
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
                <span className="inline sm:hidden">Profiel</span>{' '}
                <Icon name="user" />
              </Link>
            </span>
          </MenuItem>
        )}

        <MenuItem>
          {user ? (
            <Form
              className="flex flex-row items-center gap-5"
              action="/routes/logout"
              method="post"
            >
              <Button jumpOut secondary lighterContrast type="submit">
                Uitloggen
              </Button>
            </Form>
          ) : (
            <Link className="h-10" to="/login?redirectTo=/">
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
