import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useCatch, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import type { Item } from '~/models/items.server';
import type { User } from '~/models/user.server';
import { getItem, deleteItem } from '~/models/items.server';
import PageLayout from '~/layouts/Page';
import Tag from '~/components/Tag';
import { getUserById } from '~/models/user.server';
import { formatAmount } from '~/utils';
import Avatar from '~/components/Avatar';

type LoaderData = {
  item: Item;
  user: User;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.itemId, 'Geen item gevonden');

  const item = await getItem({ id: params.itemId });

  if (!item) {
    throw new Response('Niet gevonden', { status: 404 });
  }

  const user = await getUserById(item.userId);

  if (!user) {
    throw new Response('Geen gebruiker gevonden', { status: 404 });
  }

  return json<LoaderData>({ item, user });
};

export const action: ActionFunction = async ({ params }) => {
  invariant(params.itemId, 'Geen item gevonden');

  await deleteItem({ id: params.itemId });

  return redirect('/lijst');
};

export default function ItemDetailsPage() {
  const {
    item: { id, name, description, tags, imageUrl, amount },
    user: { name: userName },
  } = useLoaderData<LoaderData>();

  const formattedAmount = formatAmount(amount);

  return (
    <PageLayout>
      <div className="mb-10 w-full">
        <h1 className="mb-5 text-resp sm:mb-20">{name}</h1>

        <div className="flex flex-col gap-0 sm:flex-row-reverse sm:gap-10">
          <div className="sm:space-between flex w-full flex-initial flex-col sm:w-1/4">
            <div className="flex w-full flex-1 flex-col gap-0 sm:flex-initial sm:flex-row sm:flex-col xs:gap-10">
              {amount && (
                <h2 className="my-5 flex-1 text-right text-3xl sm:my-0 sm:text-left">
                  <span className="font-light text-slate-500">v.a.</span>{' '}
                  {formattedAmount}
                </h2>
              )}

              <Avatar name={userName} />
            </div>

            <ul className="my-5 flex list-none flex-row items-center p-0">
              <li className="mr-2 text-xs text-slate-500">Valt onder:</li>
              {tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </ul>
          </div>

          <div className="flex-initial sm:w-3/4">
            {imageUrl && <img className="mb-10" src={imageUrl} alt={name} />}

            <div className="prose lg:prose-xl xl:prose-2xl">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
