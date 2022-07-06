import { useEffect } from 'react';
import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { useNavigate } from 'react-router-dom';

import { getItemList } from '~/models/items.server';
import PageLayout from '~/layouts/Page';
import { useOptionalUser } from '~/utils';
import { useLoaderData } from '@remix-run/react';

type LoaderData = {
  itemList: Awaited<ReturnType<typeof getItemList>>;
};

export const loader: LoaderFunction = async () => {
  const itemList = await getItemList();
  return json<LoaderData>({ itemList });
};

export default function ItemsPage() {
  const navigate = useNavigate();
  const { itemList } = useLoaderData<LoaderData>();
  const user = useOptionalUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <PageLayout>
      <h1 className="mb-10 text-4xl">Wenslijstje</h1>
      {itemList.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </PageLayout>
  );
}
