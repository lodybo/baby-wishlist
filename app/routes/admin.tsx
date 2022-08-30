import type { LoaderArgs } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { Link, useLoaderData, Outlet, useMatches, useLocation } from '@remix-run/react';
import AdminPageLayout from '~/layouts/AdminPage';
import { getItemList } from '~/models/items.server';
import Button from '~/components/Button';
import { requireUser } from '~/session.server';
import Icon from '~/components/Icon';

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  if (user.role === 'USER') {
    return redirect('/profiel');
  }

  const items = await getItemList();

  return json({ count: items.length }, { status: 200 });
};

export default function AdminPage() {
  const matches = useMatches();
  const location = useLocation();
  const { count } = useLoaderData<typeof loader>();
  const path = matches.find(match => match.pathname === location.pathname);

  let title = 'Items toevoegen of bewerken';

  if (path?.pathname === '/admin/item/nieuw') {
    title = 'Item toevoegen';
  } else if (path?.pathname.includes('/admin/item/bewerk/')) {
    title = 'Item bewerken';
  } else if (path?.pathname.includes('/admin/item/verwijder')) {
    title = '';
  }

  const showDetails = path?.pathname === '/admin';

  const itemCount = count === 1 ? '1 item' : `${count} items`;

  return (
    <AdminPageLayout>
      <h1 className="text-4xl">{ title }</h1>

      <div className="flex flex-row justify-between">
        { showDetails ? (
          <>
            <h2 className="text-xl">{itemCount}</h2>
            <Link to="item/nieuw">
              <Button className="mx-auto md:w-auto md:mr-0" primary>
                Item toevoegen
              </Button>
            </Link>
          </>
        ): (
          <>
            <Link to="/admin">
              <Button>
                <Icon name="arrow-left-long" />
              </Button>
            </Link>
          </>
        )}
      </div>

      <div>
        <Outlet />
      </div>
    </AdminPageLayout>
  );
}
