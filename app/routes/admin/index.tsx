import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import { getItemList } from '~/models/items.server';

export const loader = async ({ request }: LoaderArgs) => {
  const items = await getItemList();
  return json({ items }, { status: 200 });
};

export default function AdminItemList() {
  const { items } = useLoaderData<typeof loader>();

  return (
    <ul className="flex flex-col gap-5">
      {
        items.map(item => (
          <li key={item.id} className="flex flex-row gap-5 items-center h-20">
            { item.imageUrl && (
              <img className="h-full w-20 object-cover" src={item.imageUrl} alt={item.name} />
            )}

            <p className="text-xl">{ item.name }</p>

            <div className="ml-auto flex flex-row gap-2.5">
              <Link to={`item/bewerk/${item.id}`}>
                <Button primary>
                  <Icon name="pencil" />
                </Button>
              </Link>

              <Link to={`item/verwijder/${item.id}`}>
                <Button danger>
                  <Icon name="trash-can" />
                </Button>
              </Link>
            </div>
          </li>
        ))
      }
    </ul>
  );
}
