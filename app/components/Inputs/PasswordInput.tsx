import { useState } from 'react';
import Icon from '~/components/Icon';
import type { Props } from './Props';
import BaseInput from '~/components/Inputs/BaseInput';

export default function PasswordInput({ ...props }: Props) {
  const [hideChars, setHideChars] = useState(true);

  return (
    <div className="relative">
      <BaseInput {...props} type={hideChars ? 'password' : 'text'} />

      <button
        className="absolute top-3 right-10"
        type="button"
        onClick={() => setHideChars(!hideChars)}
      >
        <Icon
          className={hideChars ? 'text-slate-300' : 'text-slate-600'}
          name="eye"
        />
      </button>
    </div>
  );
}
