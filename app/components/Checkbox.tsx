import classnames from 'classnames';
import { useState } from 'react';
import Icon from '~/components/Icon';
import type { Props as InputProps } from '~/components/BaseInput';
import BaseInput from '~/components/BaseInput';

type Props = InputProps & {
  caption: string;
  onChange?: () => void;
};

export default function Checkbox({
  caption,
  icon,
  defaultChecked,
  onChange,
  className = '',
  ...props
}: Props) {
  const [checked, setChecked] = useState(defaultChecked || false);

  return (
    <label
      className={classnames('cursor-pointer', className)}
      onClick={(e) => {
        e.preventDefault();
        setChecked(!checked);
        if (onChange) {
          onChange();
        }
      }}
    >
      <BaseInput
        {...props}
        className="hidden"
        type="checkbox"
        defaultChecked={checked}
      />
      <Icon
        className="mr-2 text-cyan-300"
        prefix="far"
        name={checked ? 'circle-check' : 'circle'}
      />
      <span className="text-slate-700">{caption}</span>
    </label>
  );
}
