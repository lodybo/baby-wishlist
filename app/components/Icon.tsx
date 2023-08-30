import React from 'react';
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import {
  icon as fontAwesomeIcon,
  library,
  toHtml,
} from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeftLong,
  faEllipsisVertical,
  faEuroSign,
  faPencil,
  faRemove,
  faRobot,
  faSpinner,
  faTrashCan,
  faUser,
  faEye,
  faCheck,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCircle,
  faCircleCheck,
  faCircleXmark,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faRobot,
  faEllipsisVertical,
  faSpinner,
  faTrashCan,
  faPencil,
  faArrowLeftLong,
  faEuroSign,
  faRemove,
  faUser,
  faEye,
  faCircle,
  faCircleCheck,
  faCircleXmark,
  faSquare,
  faSquareCheck,
  faCheck,
  faBars,
);

export type Props = {
  className?: React.HTMLAttributes<HTMLSpanElement>['className'];
  prefix?: Extract<IconPrefix, 'fas' | 'fab' | 'far'>;
  name: IconName;
  iconClasses?: string;
};

const Icon = ({
  name,
  prefix = 'fas',
  className = '',
  iconClasses = '',
}: Props) => {
  const icon = fontAwesomeIcon(
    {
      prefix,
      iconName: name,
    },
    {
      classes: iconClasses,
      styles: {
        height: '1em',
      },
    },
  ).abstract.shift();

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: toHtml(icon) }}
    />
  );
};

export default Icon;
