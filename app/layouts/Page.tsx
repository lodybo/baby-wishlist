import type { LayoutProps } from './LayoutProps';
import Navigation from '~/components/Navigation';
import { useOptionalUser } from '~/utils';

export default function PageLayout({ children }: LayoutProps) {
  const user = useOptionalUser();

  return (
    <>
      <Navigation isLoggedIn={!!user} />
      <div className="mx-auto h-full w-5/6">{children}</div>
    </>
  );
}
