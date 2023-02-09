import type { Props } from '~/components/BaseInput';
import BaseInput from '~/components/BaseInput';

export default function TextInput({ icon, ...props }: Props) {
  return <BaseInput {...props} type="text" icon={icon} />;
}
