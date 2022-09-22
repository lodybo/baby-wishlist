import classnames from 'classnames';
import { useState } from 'react';
import Icon from '~/components/Icon';
import type { Props as InputProps } from './Props';
import BaseInput from '~/components/Inputs/BaseInput';

type Props = InputProps & {
  caption: string;
  onChange?: () => void;
};

export default function Checkbox({
  caption,
  icon,
  defaultChecked,
  onChange,
  ...props
}: Props) {
  const [checked, setChecked] = useState(defaultChecked || false);

  return (
    <label
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
        className={classnames('mr-2', {
          'text-slate-700': !checked,
          'text-cyan-500': checked,
        })}
        prefix="far"
        name={checked ? 'circle-check' : 'circle'}
      />
      <span className="text-slate-700">{caption}</span>
    </label>
  );
}
