import { Link, useLocation } from '@remix-run/react';

import classnames from 'classnames';
import Logo from '~/components/Logo';
import NavigationMenu from '~/components/NavigationMenu';
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
      <h1 className="w-2/4 flex-auto text-3xl sm:w-1/4">
        <Link to="/">
          <Logo emblemContrast={theme === 'gold'} />
        </Link>
      </h1>

      <NavigationMenu user={user} theme={theme} />
    </nav>
  );
};

export default Navigation;
