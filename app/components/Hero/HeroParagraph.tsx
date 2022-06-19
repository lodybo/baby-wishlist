import type { FunctionComponent, ReactNode } from "react";
import classnames from 'classnames';

type Props = {
  children: ReactNode,
  footNote?: boolean,
};

const HeroParagraph: FunctionComponent<Props> = ({
  children,
  footNote = false,
}) => (
  <p className={classnames('mt-8 text-slate-900 text-center', {
    'italic': !!footNote,
    'text-sm': !!footNote,
    'text-2xl': !footNote,
  })}>
    { children }
  </p>
);

export default HeroParagraph;
