import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import {
  Link,
  useLoaderData,
  Outlet,
  useMatches,
  useLocation,
} from '@remix-run/react';
import ProfileMenu from '~/components/ProfileMenu';
import AdminPageLayout from '~/layouts/AdminPage';
import { getItemList } from '~/models/items.server';
import Button from '~/components/Button';
import { requireUser } from '~/session.server';

export const meta: MetaFunction = () => ({
  title: 'Akés administratie',
  'theme-color': '#b4885b',
});

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  if (user.role === 'USER') {
    return redirect('/profiel');
  }

  const items = await getItemList();

  return json({ count: items.length, name: user.name }, { status: 200 });
};

export default function AdminPage() {
  const matches = useMatches();
  const location = useLocation();
  const { count } = useLoaderData<typeof loader>();
  const path = matches.find((match) => match.pathname === location.pathname);

  let title = 'Items toevoegen of bewerken';

  if (path?.pathname === '/admin/item/nieuw') {
    title = 'Item toevoegen';
  } else if (path?.pathname.includes('/admin/item/bewerk/')) {
    title = 'Item bewerken';
  } else if (path?.pathname.includes('/admin/item/verwijder')) {
    title = '';
  } else if (path?.pathname === '/admin/gebruikers') {
    title = 'Gebuikers beheren';
  }

  const showDetails = path?.pathname === '/admin';

  const itemCount = count === 1 ? '1 item' : `${count} items`;

  return (
    <AdminPageLayout>
      <h1 className="mb-5 text-4xl">{title}</h1>

      <div className="flex flex-col gap-10 md:flex-row">
        <ProfileMenu role="ADMIN" theme="gold" />

        <div className="w-full md:w-3/4">
          {showDetails && (
            <div className="flex w-full flex-row justify-between sm:w-3/4">
              <h2 className="text-xl">{itemCount}</h2>
              <Link to="item/nieuw">
                <Button className="mx-auto md:mr-0 md:w-auto" primary>
                  Item toevoegen
                </Button>
              </Link>
            </div>
          )}

          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}
