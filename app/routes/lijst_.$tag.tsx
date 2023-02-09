import { json } from '@remix-run/node';
import type { MetaFunction, LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { marked } from 'marked';
import invariant from 'tiny-invariant';
import BackButton from '~/components/BackButton';
import ItemGrid from '~/components/ItemGrid';
import { getItemsByTag } from '~/models/items.server';

export const meta: MetaFunction<typeof loader> = ({ data: { tag } }) => ({
  title: tag,
});

export const loader = async ({ params }: LoaderArgs) => {
  const { tag } = params;

  invariant(tag, 'No tag is found');

  const taggedItems = await getItemsByTag({ tag });

  const items = taggedItems.map((item) => ({
    ...item,
    description: item.description
      ? `${marked.parse(item.description).substring(0, 250)}...`
      : '',
  }));

  return json({ tag, items });
};

export default function TagListPage() {
  const { tag, items } = useLoaderData<typeof loader>();

  if (!items.length) {
    return (
      <div className="flex h-72 items-center justify-center">
        <h1 className="text-4xl">
          Sorry, er zijn geen items gevonden voor "{tag}"
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row items-center gap-5">
        <BackButton to="/lijst" />
        <h1 className="mb-10 font-handwritten text-resp capitalize">{tag}</h1>
      </div>

      <ItemGrid items={items} />
    </>
  );
}
