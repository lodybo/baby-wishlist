import { useLoaderData } from '@remix-run/react';
import type{ ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import ItemForm from '~/components/ItemForm';
import type { ItemFormData } from '~/components/ItemForm';
import { getUsers } from '~/models/user.server';
import { createItem, claimItem } from '~/models/items.server';

export const loader = async () => {
  const users = await getUsers();

  return json({ users });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const item = Object.fromEntries(formData) as unknown as ItemFormData;

  const newItem = await createItem({
    name: item.name,
    amount: parseFloat(item.amount),
    imageUrl: item.imageUrl,
    description: item.description,
    tags: item.tags.split(','),
    userId: item.itemOwner,
  });

  if (item.claimedBy !== 'none') {
    await claimItem({
      itemId: newItem.id,
      claimUserId: item.claimedBy,
    });
  }

  return redirect('/admin');
};

export default function NewItemPage() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div>
      <ItemForm state="new" users={users} />
    </div>
  );
}
