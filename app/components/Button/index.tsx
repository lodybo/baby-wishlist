import React from 'react';
import classnames from 'classnames';
import Icon from '~/components/Icon';

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
   * Whether the button looks like a normal button, or has some extra attention-catching styling.
   */
  primary?: boolean;

  /**
   * Whether the button represents a dangerous action, and is styled accordingly.
   */
  danger?: boolean;

  /**
   * Whether the button is disabled or not.
   */
  disabled?: boolean;

  /**
   * Whether the button represents an action that is pending.
   */
  pending?: boolean;

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
  danger = false,
  disabled = false,
  pending = false,
  className = '',
}: Props) {
  const classes = classnames(
    'py-2 px-4 flex items-center justify-center rounded transition duration-300 motion-reduce:transition-none',
    {
      'bg-cyan-600': primary && !disabled,
      'text-cyan-50': primary && !disabled,
      'hover:bg-cyan-800': primary && !disabled,

      'bg-slate-300': !primary && !disabled,
      'text-slate-900': !primary && !disabled,
      'hover:bg-slate-400': !primary && !disabled,

      'bg-rose-500': danger,
      'text-rose-100': danger,
      'hover:bg-rose-700': danger,

      'hover:scale-110': jumpOut,

      'bg-slate-100': disabled,
      'text-slate-400': disabled,
    },
    className,
  );

  if (useSpan) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button className={classes} type={type} disabled={disabled}>
      { pending && (
        <span className="mr-2">
          <Icon name="spinner" iconClasses="fa-spin-pulse" />
        </span>
      )}
      {children}
    </button>
  );
}
