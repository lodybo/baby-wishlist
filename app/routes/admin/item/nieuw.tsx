import { json } from '@remix-run/node';
import ItemForm from '~/components/ItemForm';
import { getUsers } from '~/models/user.server';
import { useLoaderData } from '@remix-run/react';

export const loader = async () => {
  const users = await getUsers();

  return json({ users });
};

export default function NewItemPage() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div>
      <ItemForm state="new" users={users} />
    </div>
  );
}
