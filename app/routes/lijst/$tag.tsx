import { json } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import BackButton from '~/components/BackButton';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import ItemGrid from '~/components/ItemGrid';
import ListItem from '~/components/ListItem';
import PageLayout from '~/layouts/Page';
import { getItemsByTag } from '~/models/items.server';

export const loader = async ({ params }: LoaderArgs) => {
  const { tag } = params;

  invariant(tag, 'No tag is found');

  const taggedItems = await getItemsByTag({ tag });

  return json({ tag, items: taggedItems });
};

export default function TagListPage() {
  const { tag, items } = useLoaderData<typeof loader>();

  if (!items.length) {
    return (
      <PageLayout>
        <div className="flex h-72 items-center justify-center">
          <h1 className="text-4xl">
            Sorry, er zijn geen items gevonden voor "{tag}"
          </h1>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-row gap-5">
        <BackButton to="/lijst" />
        <h1 className="mb-10 text-4xl capitalize">{tag}</h1>
      </div>

      <ItemGrid items={items} />
    </PageLayout>
  );
}
