import type { Props } from '~/components/BaseInput';
import BaseInput from '~/components/BaseInput';

export default function NumberInput({ icon, ...props }: Props) {
  return (
    <BaseInput
      {...props}
      inputClassName="appearance-none"
      step="0.01"
      type="number"
      icon={icon}
    />
  );
}
