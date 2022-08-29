import type { LayoutProps } from './LayoutProps';
import Navigation from '~/components/Navigation';
import { useOptionalUser } from '~/utils';

export default function AdminPageLayout({ children }: LayoutProps) {
  const user = useOptionalUser();

  return (
    <>
      <Navigation user={user} />
      <div className="mx-5 w-full md:mx-auto md:w-1/2 flex flex-col gap-10">{children}</div>
    </>
  );
}
