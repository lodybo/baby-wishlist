import React from 'react';
import classnames from 'classnames';

export type Props = {
  /**
   * Use a <span /> element instead of a button (handy for using inside a <Link/> component.
   */
  useSpan?: boolean;

  /**
   * The type of the button.
   * @default "button"
   */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];

  /**
   * The contents of the button.
   */
  children: React.ReactNode;

  /**
   * Whether the button should "jump out" when hovered.
   */
  jumpOut?: boolean;

  /**
   * Whether the button looks like a normal button, or has some extra attention-catching styling
   */
  primary?: boolean;

  /**
   * For additional classes.
   */
  className?: string;
};

export default function Button({
  children,
  useSpan = false,
  type = 'button',
  jumpOut = false,
  primary = false,
  className = '',
}: Props) {
  const classes = classnames(
    'w-full h-full py-2 px-4 flex items-center justify-center rounded transition duration-300 motion-reduce:transition-none',
    {
      'bg-cyan-600': primary,
      'text-cyan-50': primary,
      'hover:bg-cyan-800': primary,

      'bg-slate-200': !primary,
      'text-slate-700': !primary,
      'hover:bg-slate-300': !primary,

      'hover:scale-110': jumpOut,
    },
    className,
  );

  if (useSpan) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  );
}
