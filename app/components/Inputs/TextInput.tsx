import type { Props } from './Props';
import BaseInput from '~/components/Inputs/BaseInput';

export default function TextInput({ icon, ...props }: Props) {
  return (
    <BaseInput {...props} type="text" icon={icon} />
  );
}
