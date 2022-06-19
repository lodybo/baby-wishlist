import Hero from '~/components/Hero';

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="w-5/6 mx-auto">
      <Hero />
    </main>
  );
}
