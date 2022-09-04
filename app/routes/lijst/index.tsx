import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { marked } from 'marked';

import { getItemList } from '~/models/items.server';
import PageLayout from '~/layouts/Page';
import { requireUser } from '~/session.server';
import { useOptionalUser } from '~/utils';
import ListItem from '~/components/ListItem';

export const loader = async ({ request }: LoaderArgs) => {
  await requireUser(request);
  const itemList = await getItemList();

  const items = itemList.map((item) => ({
    ...item,
    description: `${marked.parse(item.description).substring(0, 250)}...`,
  }));

  return json({ items });
};

export default function ItemsPage() {
  const { items } = useLoaderData<typeof loader>();

  return (
    <PageLayout>
      <h1 className="mb-10 text-4xl">Wenslijstje</h1>

      <ul className="block sm:flex sm:flex-row sm:flex-wrap sm:gap-10">
        {items.map(({ id, name, imageUrl, description, tags }) => (
          <ListItem
            key={id}
            id={id}
            name={name}
            imageUrl={imageUrl}
            description={description}
            tags={tags}
          />
        ))}
      </ul>
    </PageLayout>
  );
}
