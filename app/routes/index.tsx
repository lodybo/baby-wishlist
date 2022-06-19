import { Form, Link } from "@remix-run/react";
import Hero from '~/components/hero';

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="w-5/6 mx-auto">
      <Hero />
    </main>
  );
}
