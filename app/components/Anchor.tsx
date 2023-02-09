import { Link } from '@remix-run/react';
import type { LinkProps } from '@remix-run/react';
import type { Theme } from '~/types/Theme';

type Props = LinkProps & {
  theme?: Theme;
};

export default function Anchor({ children, theme = 'cyan', ...props }: Props) {
  let borderColor = 'border-b-cyan-300';

  if (theme === 'lime') {
    borderColor = 'border-b-lime-300';
  } else if (theme === 'gold') {
    borderColor = 'border-b-gold-300';
  }

  return (
    <Link {...props} className={`border-b border-b-2 ${borderColor} pb-1`}>
      {children}
    </Link>
  );
}
