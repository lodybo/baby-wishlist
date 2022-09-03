import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import Button from '~/components/Button';
import { getUsers, editUserRole } from '~/models/user.server';
import type { User } from '~/models/user.server';
import { requireUser } from '~/session.server';

type FormData = {
  userId: string;
  newRole: User['role'];
};

export const loader = async ({ request }: LoaderArgs) => {
  await requireUser(request);
  const users = await getUsers();

  return json({ users });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const { userId, newRole } = Object.fromEntries(
    formData,
  ) as unknown as FormData;

  await editUserRole({
    id: userId,
    newRole,
  });

  return null;
};

export default function AdminUsersPage() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <ul className="flex w-3/4 flex-col gap-5">
      {users.map((user) => (
        <li key={user.id} className="flex flex-row justify-between">
          <span>{user.name}</span>

          <Form method="post">
            <input type="hidden" name="userId" value={user.id} />
            <input
              type="hidden"
              name="newRole"
              value={user.role === 'USER' ? 'ADMIN' : 'USER'}
            />

            <Button type="submit" primary={user.role === 'ADMIN'}>
              {user.role === 'USER' ? 'Gebruiker' : 'Admin'}
            </Button>
          </Form>
        </li>
      ))}
    </ul>
  );
}
