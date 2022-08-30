import classnames from 'classnames';
import Icon from '~/components/Icon';
import type { Props } from './Props';

export default function BaseInput({ icon, className, inputClassName, ...props }: Props) {
  return (
    <div className={classnames(`
      flex
      flex-row
      rounded
      border
      border-slate-300
      focus-within:ring
      focus-within:ring-primary
      focus-within:ring-offset-2
      focus-within:ring-offset-slate-50
    `,
      className,
    )}>
      { icon && (
        <Icon className="pl-2.5 justify-center self-center" name={icon} />
      )}
      <input
        className={classnames(
          'w-full h-full bg-transparent text-lg text-slate-700 p-2 focus:outline-none',
          inputClassName
        )}
        {...props}
      />
    </div>
  );
}
