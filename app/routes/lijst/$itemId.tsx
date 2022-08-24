import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import type { Item } from '~/models/items.server';
import type { User } from '~/models/user.server';
import { getItem, unclaimItem, claimItem } from '~/models/items.server';
import PageLayout from '~/layouts/Page';
import Tag from '~/components/Tag';
import { getUserById } from '~/models/user.server';
import { formatAmount, useOptionalUser } from '~/utils';
import Avatar from '~/components/Avatar';
import ClaimField from '~/components/ClaimField';

type LoaderData = {
  item: Item;
  user: User;
};

interface Action {
  action: 'CLAIM' | 'UNCLAIM' | 'DELETE';
}

interface ClaimAction extends Action {
  action: 'CLAIM';
  userId: User['id'];
}

interface UnclaimAction extends Action {
  action: 'UNCLAIM';
  userId: User['id'];
}

interface DeleteAction extends Action {
  action: 'DELETE';
}

type ActionData = ClaimAction| UnclaimAction | DeleteAction;

export const loader = async ({ params }: LoaderArgs) => {
  const { itemId } = params;
  invariant(itemId, 'Geen item gevonden');

  const item = await getItem({ id: itemId });

  if (!item) {
    throw new Response('Niet gevonden', { status: 404 });
  }

  const user = await getUserById(item.userId);

  if (!user) {
    throw new Response('Geen gebruiker gevonden', { status: 404 });
  }

  return json({ item, user });
};

export const action = async ({ request, params }: ActionArgs) => {
  const { itemId } = params;
  invariant(itemId, 'Geen item gevonden');

  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as ActionData;

  switch (data.action) {
    case 'CLAIM':
      // TODO: crud
      await claimItem({
        itemId,
        claimUserId: data.userId,
      });
      return redirect(`/lijst/${itemId}`);

    case 'UNCLAIM':
      await unclaimItem({
        itemId,
      });
      return redirect(`/lijst/${itemId}`);

    case 'DELETE':
      // TODO: Implement CRUD interface
      // await deleteItem({ id: params.itemId });
      // return redirect('/lijst');
      break;
  }
};

export default function ItemDetailsPage() {
  const navigate = useNavigate();

  const {
    item: { name, description, tags, imageUrl, amount, claimId },
    user: { name: userName },
  } = useLoaderData<typeof loader>();

  const currentUser = useOptionalUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

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
                  {formatAmount(amount)}
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

            { currentUser && (
              <ClaimField currentUserId={currentUser.id} claimId={claimId} />
            )}
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
