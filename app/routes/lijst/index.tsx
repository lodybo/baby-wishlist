import { useEffect } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useNavigate } from 'react-router-dom';
import { marked } from 'marked';

import { getItemList } from '~/models/items.server';
import PageLayout from '~/layouts/Page';
import { useOptionalUser } from '~/utils';
import ListItem from '~/components/ListItem';

export const loader = async () => {
  const itemList = await getItemList();

  const items = itemList.map(item => ({
    ...item,
    description: `${marked.parse(item.description).substring(0, 250)}...`,
  }));

  return json({ items });
};

export default function ItemsPage() {
  const navigate = useNavigate();
  const { items } = useLoaderData<typeof loader>();
  const user = useOptionalUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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
