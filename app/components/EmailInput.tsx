import type { Props } from '~/components/BaseInput';
import BaseInput from '~/components/BaseInput';

export default function Email({ ...props }: Props) {
  return <BaseInput {...props} type="email" />;
}
