import classNames from 'classnames';
import type { ReactNode } from 'react';

type Props = {
  id?: string;
  extraTopPadding?: boolean;
  children: ReactNode;
};

export default function ErrorText({
  id = '',
  extraTopPadding = false,
  children,
}: Props) {
  return (
    <p
      className={classNames('text-rose-700', {
        'pt-1': !extraTopPadding,
        'pt-5': extraTopPadding,
      })}
      id={id}
    >
      {children}
    </p>
  );
}
