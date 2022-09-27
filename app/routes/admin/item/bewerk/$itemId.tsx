import { useLoaderData } from '@remix-run/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import type { ItemFormData } from '~/components/ItemForm';
import ItemForm from '~/components/ItemForm';
import { processImage } from '~/models/images.server';
import {
  claimItem,
  editItem,
  getItem,
  unclaimItem,
} from '~/models/items.server';
import { getUsers } from '~/models/user.server';
import { requireUser } from '~/session.server';

export const loader = async ({ request, params }: LoaderArgs) => {
  await requireUser(request);
  const users = await getUsers();

  const { itemId } = params;
  invariant(itemId, `Geen item gevonden met id ${itemId}`);

  const item = await getItem({
    id: itemId,
  });

  invariant(item, 'Geen item gevonden');

  return json({ item, users });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const item = Object.fromEntries(formData) as unknown as ItemFormData;

  const currentItem = await getItem({ id: item.id });

  const newItem = await editItem({
    id: item.id,
    name: item.name,
    amount: parseFloat(item.amount),
    imageUrl: item.imageUrl,
    description: item.description,
    tags: item.tags.split(','),
    userId: item.itemOwner,
  });

  if (
    currentItem &&
    currentItem.imageUrl &&
    item.imageUrl &&
    currentItem.imageUrl !== item.imageUrl
  ) {
    await processImage({
      url: item.imageUrl,
      itemId: item.id,
    });
  }

  if (item.claimedBy !== 'none') {
    await claimItem({
      itemId: newItem.id,
      claimUserId: item.claimedBy,
    });
  } else {
    await unclaimItem({
      itemId: newItem.id,
    });
  }

  return redirect('/admin');
};

export default function EditItemPage() {
  const { item, users } = useLoaderData<typeof loader>();

  return (
    <div>
      <ItemForm state="edit" users={users} item={item} />
    </div>
  );
}
