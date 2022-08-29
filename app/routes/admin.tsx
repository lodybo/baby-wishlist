import type { LoaderArgs } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { Link, useLoaderData, Outlet } from '@remix-run/react';
import AdminPageLayout from '~/layouts/AdminPage';
import { getItemList } from '~/models/items.server';
import Button from '~/components/Button';
import { requireUser } from '~/session.server';

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  if (user.role === 'USER') {
    return redirect('/profiel');
  }

  const items = await getItemList();

  return json({ count: items.length }, { status: 200 });
};

export default function AdminPage() {
  const { count } = useLoaderData<typeof loader>();

  const itemCount = count === 1 ? '1 item' : `${count} items`;

  return (
    <AdminPageLayout>
      <h1 className="text-4xl">Items toevoegen of bewerken</h1>
      <div className="flex flex-row justify-between">
        <h2 className="text-xl">{itemCount}</h2>
        <Link to="item/new">
          <Button className="mx-auto md:w-auto md:mr-0" primary>
            Item toevoegen
          </Button>
        </Link>
      </div>

      <div>
        <Outlet />
      </div>
    </AdminPageLayout>
  );
}
