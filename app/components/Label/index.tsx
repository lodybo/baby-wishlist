import type { ReactNode } from 'react';
import classnames from 'classnames';

export type Props = {
  caption: string;
  subCaption?: string;
  children: ReactNode;
};

export default function Label({ caption, children, subCaption }: Props) {
  return (
    <label>
      <p className={classnames(
        'block text-lg font-medium text-slate-700',
        {
          'mb-1': !subCaption,
        }
      )}>{caption}</p>

      { subCaption && (
        <small className="block mb-2 text-sm font-medium text-slate-500">{subCaption}</small>
      )}

      {children}
    </label>
  );
}
