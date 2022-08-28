import type { LoaderArgs } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { requireUser } from '~/session.server';
import AdminPageLayout from '~/layouts/AdminPage';
import { getItemList } from '~/models/items.server';
import { Link, useLoaderData } from '@remix-run/react';
import Button from '~/components/Button';
import Icon from '~/components/Icon';

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  if (user.role === 'USER') {
    return redirect('/profiel');
  }

  const items = await getItemList();

  return json({ items }, { status: 200 });
};

export default function AdminPage() {
  const { items } = useLoaderData<typeof loader>();

  return (
    <AdminPageLayout>
      <div>
        <Button className="mx-auto md:w-auto md:mr-0" primary>
          Item toevoegen
        </Button>
      </div>

      <ul className="flex flex-col gap-5">
        {
          items.map(item => (
            <li key={item.id} className="flex flex-row gap-5 items-center h-20">
              { item.imageUrl && (
                <img className="h-full w-20 object-cover" src={item.imageUrl} alt={item.name} />
              )}

              <p className="text-xl">{ item.name }</p>

              <div className="ml-auto flex flex-row gap-2.5">
                <Link to={`/item/bewerk/${item.id}`}>
                  <Button primary>
                    <Icon name="pencil" />
                  </Button>
                </Link>

                <Link to={`/item/verwijder/${item.id}`}>
                  <Button danger>
                    <Icon name="trash-can" />
                  </Button>
                </Link>
              </div>
            </li>
          ))
        }
      </ul>
    </AdminPageLayout>
  );
}
