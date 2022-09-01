import type { LayoutProps } from './LayoutProps';
import Navigation from '~/components/Navigation';
import { useOptionalUser } from '~/utils';

export default function AuthPageLayout({ children }: LayoutProps) {
  const user = useOptionalUser();

  return (
    <>
      <Navigation user={user} />
      <div className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-md lg:max-w-2xl">{children}</div>
      </div>
    </>
  );
}
