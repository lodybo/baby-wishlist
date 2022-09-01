import type { Props } from './Props';
import BaseInput from '~/components/Inputs/BaseInput';

export default function Email({ ...props }: Props) {
  return <BaseInput {...props} type="email" />;
}
