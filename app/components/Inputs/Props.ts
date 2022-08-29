import type { IconName } from '@fortawesome/fontawesome-svg-core';

export type Props = JSX.IntrinsicElements['input'] & {
  icon?: IconName;
  inputClassName?: string;
};
