import type { LayoutProps } from './LayoutProps';
import Navigation from '~/components/Navigation';
import { useOptionalUser } from '~/utils';

export default function AdminPageLayout({ children }: LayoutProps) {
  const user = useOptionalUser();

  return (
    <>
      <Navigation user={user} isInAdminLayout={true} />
      <div className="mx-auto w-full">{children}</div>
    </>
  );
}
