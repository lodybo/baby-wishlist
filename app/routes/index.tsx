import Hero from '~/components/Hero';
import Navigation from '~/components/Navigation';

import { useOptionalUser } from '~/utils';

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="h-full">
      <Navigation />
      <Hero />
    </main>
  );
}
