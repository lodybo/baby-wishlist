import type { Props } from './Props';
import BaseInput from '~/components/Inputs/BaseInput';

export default function NumberInput({ icon, ...props }: Props) {
  return (
    <BaseInput {...props} inputClassName="appearance-none" step="0.01" type="number" icon={icon} />
  );
}
