import classnames from 'classnames';
import Icon from '~/components/Icon';
import type { Props } from './Props';

export default function BaseInput({
  icon,
  className,
  inputClassName,
  ...props
}: Props) {
  return (
    <div
      className={classnames(
        `
      focus-within:ring-primary
      flex
      flex-row
      rounded
      border
      border-slate-300
      focus-within:ring
      focus-within:ring-offset-2
      focus-within:ring-offset-slate-50
    `,
        className,
      )}
    >
      {icon && (
        <Icon className="justify-center self-center pl-2.5" name={icon} />
      )}
      <input
        className={classnames(
          'focus:bg-white h-full w-full bg-cyan-50 p-2 text-lg text-slate-700 transition focus:outline-none',
          inputClassName,
        )}
        {...props}
      />
    </div>
  );
}
