import { LayoutProps } from './LayoutProps';

const PageLayout = ({ children }: LayoutProps) => (
  <div className="w-5/6 h-full mx-auto">
    { children }
  </div>
);

export default PageLayout;
