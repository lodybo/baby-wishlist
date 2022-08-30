import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import Button from '~/components/Button';
import { deleteItem, getItem } from '~/models/items.server';

export const loader = async ({ params }: LoaderArgs) => {
  const { itemId, } = params;
  invariant(itemId, 'Er kan geen item gevonden worden omdat er geen ID is meegegeven.');

  const item = await getItem({ id: itemId });
  invariant(item, `Geen item gevonden met het ID: ${itemId}`);

  return json({ item });
};

export const action = async ({ params }: ActionArgs) => {
  const { itemId, } = params;
  invariant(itemId, 'Er kan geen item gevonden worden omdat er geen ID is meegegeven.');

  await deleteItem({
    id: itemId,
  });

  return redirect('/admin');
};

export default function DeleteItemPage() {
  const { item } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-5xl mb-10 text-center">Weet je zeker dat je dit wilt verwijderen?</h1>

      <div className="flex flex-row place-items-center gap-5 mb-10">
        <img className="flex-none w-1/4 h-full w-48 object-cover" src={item.imageUrl || ''} alt={item.name} />

        <h2 className="text-3xl flex-none w-3/4">{item.name}</h2>
      </div>

      <div className="flex flex-row gap-14 justify-center">
        <Link to="/admin">
          <Button useSpan>Nee, laat maar</Button>
        </Link>

        <form method="post">
          <Button danger type="submit">Ja, ik weet het zeker</Button>
        </form>
      </div>
    </>
  );
}
