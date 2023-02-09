import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { marked } from 'marked';
import ItemGrid from '~/components/ItemGrid';

import { getItemList } from '~/models/items.server';

export const meta: MetaFunction = () => ({
  title: 'Akés lijst',
});

export const loader = async () => {
  const itemList = await getItemList();

  const items = itemList.map((item) => ({
    ...item,
    description: item.description
      ? `${marked.parse(item.description).substring(0, 250)}...`
      : '',
  }));

  return json({ items });
};

export default function ItemsPage() {
  const { items } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="mb-10 font-handwritten text-resp">Wenslijstje</h1>

      <ItemGrid items={items} />
    </>
  );
}
