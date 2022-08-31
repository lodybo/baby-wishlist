import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import SmallListItem from '~/components/ListItem/Small';
import { getItemList } from '~/models/items.server';

export const loader = async () => {
  const items = await getItemList();
  return json({ items }, { status: 200 });
};

export default function AdminItemList() {
  const { items } = useLoaderData<typeof loader>();

  return (
    <ul className="flex flex-col gap-5">
      {items.map((item) => (
        <SmallListItem
          key={item.id}
          item={item}
          actionRow={
            <>
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
            </>
          }
        />
      ))}
    </ul>
  );
}
