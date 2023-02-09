import type { ReactNode } from 'react';
import classnames from 'classnames';

export type Props = {
  caption: string;
  subCaption?: string;
  children: ReactNode;
  className?: string;
};

export default function Label({
  caption,
  children,
  subCaption,
  className = '',
}: Props) {
  return (
    <label className={`${className} block`}>
      <p
        className={classnames('block text-lg font-medium text-slate-700', {
          'mb-1': !subCaption,
        })}
      >
        {caption}
      </p>

      {subCaption && (
        <small className="mb-2 block text-sm font-medium text-slate-500">
          {subCaption}
        </small>
      )}

      {children}
    </label>
  );
}
