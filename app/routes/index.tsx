import Hero from '~/components/Hero';
import PageLayout from '~/layouts/Page';

export default function Index() {
  return (
    <PageLayout>
      <main className="h-full">
        <Hero />
      </main>
    </PageLayout>
  );
}
