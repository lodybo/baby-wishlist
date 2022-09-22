import { useState } from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import Checkbox from '~/components/Inputs/Checkbox';
import SmallListItem from '~/components/ListItem/Small';
import { getItemList } from '~/models/items.server';
import { requireUser } from '~/session.server';

export const loader = async ({ request }: LoaderArgs) => {
  await requireUser(request);
  const list = await getItemList({ includeClaimedUser: true });

  const items = list.map(({ id, name, imageUrl, claimUser }) => {
    let claimedUser;

    if (claimUser) {
      claimedUser = claimUser.name;
    }

    return {
      id,
      name,
      imageUrl,
      claimedUserName: claimedUser,
    };
  });

  return json({ items }, { status: 200 });
};

export default function AdminItemList() {
  const [showClaimedStatus, setShowClaimedStatus] = useState(false);
  const { items } = useLoaderData<typeof loader>();

  const handleShowClaimedStatus = () => {
    console.log('aa');
    setShowClaimedStatus(!showClaimedStatus);
  };

  return (
    <div className="flex flex-col gap-5">
      <Checkbox
        caption="Toon welke items geclaimed zijn"
        onChange={handleShowClaimedStatus}
      />

      <ul className="flex flex-col gap-5">
        {items.map((item) => (
          <SmallListItem
            key={item.id}
            item={item}
            showClaimedItems={showClaimedStatus}
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
    </div>
  );
}
