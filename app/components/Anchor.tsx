import { Link } from '@remix-run/react';
import type { LinkProps } from '@remix-run/react';

type Props = LinkProps;

export default function Anchor({ children, ...props }: Props) {
  return (
    <Link {...props} className="border-b border-b-2 border-b-cyan-300 pb-1">
      {children}
    </Link>
  );
}
