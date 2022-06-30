import { LayoutProps } from './LayoutProps';

const PageLayout = ({ children }: LayoutProps) => (
  <div className="mx-auto h-full w-5/6">{children}</div>
);

export default PageLayout;
