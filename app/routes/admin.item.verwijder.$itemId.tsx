import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import Button from '~/components/Button';
import { deleteItem, getItem } from '~/models/items.server';
import { requireUser } from '~/session.server';

export const loader = async ({ request, params }: LoaderArgs) => {
  await requireUser(request);
  const { itemId } = params;
  invariant(
    itemId,
    'Er kan geen item gevonden worden omdat er geen ID is meegegeven.',
  );

  const item = await getItem({ id: itemId });
  invariant(item, `Geen item gevonden met het ID: ${itemId}`);

  return json({ item });
};

export const action = async ({ params }: ActionArgs) => {
  const { itemId } = params;
  invariant(
    itemId,
    'Er kan geen item gevonden worden omdat er geen ID is meegegeven.',
  );

  await deleteItem({
    id: itemId,
  });

  return redirect('/admin');
};

export default function DeleteItemPage() {
  const { item } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="mb-10 text-center text-5xl">
        Weet je zeker dat je dit wilt verwijderen?
      </h1>

      <div className="mb-10 flex flex-row place-items-center gap-5">
        <img
          className="h-full w-1/4 w-48 flex-none object-cover"
          src={item.imageUrl || ''}
          alt={item.name}
        />

        <h2 className="w-3/4 flex-none text-3xl">{item.name}</h2>
      </div>

      <div className="flex flex-row justify-center gap-14">
        <Link to="/admin">
          <Button useSpan>Nee, laat maar</Button>
        </Link>

        <form method="post">
          <Button danger type="submit">
            Ja, ik weet het zeker
          </Button>
        </form>
      </div>
    </>
  );
}
