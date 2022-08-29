import type { Props } from './Props';
import BaseInput from '~/components/Inputs/BaseInput';

export default function NumberInput({ icon, ...props }: Props) {
  return (
    <BaseInput {...props} inputClassName="appearance-none" type="number" icon={icon} />
  );
}
