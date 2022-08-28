import type { LayoutProps } from './LayoutProps';
import Navigation from '~/components/Navigation';
import { useOptionalUser } from '~/utils';

export default function AuthPageLayout({ children }: LayoutProps) {
  const user = useOptionalUser();

  return (
    <>
      <Navigation user={user} />
      <div className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-md px-8 lg:max-w-xl">
          {children}
        </div>
      </div>
    </>
  );
}
