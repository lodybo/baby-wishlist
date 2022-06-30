import React from "react";
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { icon as fontAwesomeIcon, toHtml } from '@fortawesome/fontawesome-svg-core';

export type Props = {
  className?: React.HTMLAttributes<HTMLSpanElement>['className'],
  prefix?: Extract<IconPrefix, 'fas' | 'fab' | 'far'>,
  name: IconName;
};

const Icon = ({ name, prefix = 'fas', className = '' }: Props) => {
  const icon = fontAwesomeIcon({
    prefix,
    iconName: name,
  })
    .abstract
    .shift();

  return (
    <span className={ className } dangerouslySetInnerHTML={{ __html: toHtml(icon)}} />
  );
};

export default Icon;
