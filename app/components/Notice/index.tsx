import classnames from 'classnames';
import Icon from '~/components/Icon';

export type Props = {
  visible: boolean;
  message: string;
  state?: 'info' | 'success' | 'warning' | 'error';
  closeHandler: () => void;
};

export default function Notice({
  visible,
  message,
  state = 'info',
  closeHandler,
}: Props) {
  return (
    <div
      className={classnames('flex flex-row border border-4 px-8 py-4', {
        hidden: !visible,

        'border-cyan-100': state === 'info',
        'bg-cyan-50': state === 'info',
        'text-cyan-900': state === 'info',

        'border-emerald-100': state === 'success',
        'bg-emerald-50': state === 'success',
        'text-emerald-900': state === 'success',

        'border-amber-100': state === 'warning',
        'bg-amber-50': state === 'warning',
        'text-amber-900': state === 'warning',

        'border-rose-100': state === 'error',
        'bg-rose-50': state === 'error',
        'text-rose-900': state === 'error',
      })}
    >
      <p className="w-3/4">{message}</p>

      <div className="relative w-1/4">
        <button className="absolute right-0" onClick={closeHandler}>
          <Icon
            className={classnames({
              'text-cyan-600': state === 'info',
              'text-emerald-600': state === 'success',
              'text-amber-600': state === 'warning',
              'text-rose-600': state === 'error',
            })}
            prefix="far"
            name="circle-xmark"
          />
        </button>
      </div>
    </div>
  );
}
