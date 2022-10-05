import type { LayoutProps } from './LayoutProps';
import Navigation from '~/components/Navigation';
import { useOptionalUser } from '~/utils';
import Footer from '~/components/Footer';

export default function PageLayout({ children }: LayoutProps) {
  const user = useOptionalUser();

  return (
    <>
      <Navigation user={user} />
      <div className="mx-auto mt-5 w-5/6">{children}</div>
      <Footer />
    </>
  );
}
