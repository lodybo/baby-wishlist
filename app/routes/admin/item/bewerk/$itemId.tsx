import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { getItem } from '~/models/items.server';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ params }: LoaderArgs) => {
  const { itemId } = params;
  invariant(itemId, `Geen item gevonden met id ${itemId}`);

  const item = await getItem({
    id: itemId,
  });

  invariant(item, 'Geen item gevonden');

  return json({ item });
};

export default function EditItemPage() {
  const { item } = useLoaderData<typeof loader>();

  return (
    <div>
      <h3>{item.name}</h3>
    </div>
  );
}
