import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { marked } from 'marked';

import { getUserById } from '~/models/user.server';
import { getItem } from '~/models/items.server';
import PageLayout from '~/layouts/Page';
import Tag from '~/components/Tag';
import { requireUser } from '~/session.server';
import { formatAmount, useOptionalUser } from '~/utils';
import ItemOwner from '~/components/ItemOwner';
import ClaimField from '~/components/ClaimField';

export const meta: MetaFunction<typeof loader> = ({
  data: { item },
  location,
}) => {
  let origin = 'https://babywensjes.kaskady.nl';

  if (typeof document !== 'undefined') {
    origin = document.location.origin;
  }

  return {
    title: item.name,
    description: `${marked.parse(item.description).substring(0, 250)}...`,
    // Open Graph / Facebook
    'og:type': 'website',
    'og:url': `${origin}${location.pathname}`,
    'og:title': item.name,
    'og:description': item.description,
    'og:image': `${origin}/images/${item.id}-160w.webp`,

    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:url': `${origin}${location.pathname}`,
    'twitter:title': item.name,
    'twitter:description': item.description,
    'twitter:image': `${origin}/images/${item.id}-160w.webp`,
  };
};

export const loader = async ({ request, params }: LoaderArgs) => {
  await requireUser(request);
  const { itemId } = params;
  invariant(itemId, 'Geen item gevonden');

  const item = await getItem({ id: itemId });

  if (!item) {
    throw new Response('Niet gevonden', { status: 404 });
  }

  const user = await getUserById(item.userId);

  if (!user) {
    throw new Response('Geen gebruiker gevonden', { status: 404 });
  }

  const parsedDescription = marked.parse(item.description);

  return json({ item: { ...item, description: parsedDescription }, user });
};

export default function ItemDetailsPage() {
  const {
    item: { id, name, description, tags, imageUrl, amount, claimId },
    user: { name: userName },
  } = useLoaderData<typeof loader>();

  const currentUser = useOptionalUser();

  return (
    <PageLayout>
      <div className="mb-10 w-full">
        <h1 className="mb-5 text-resp text-slate-700 sm:mb-20">{name}</h1>

        <div className="flex flex-col gap-0 sm:flex-row-reverse sm:gap-10">
          <div className="sm:space-between flex w-full flex-initial flex-col sm:w-1/3">
            <div className="flex w-full flex-1 flex-col gap-0 sm:flex-initial sm:flex-row sm:flex-col xs:gap-10">
              {amount && (
                <h2 className="my-5 flex-1 text-right text-3xl sm:my-0 sm:text-left">
                  <span className="font-light text-slate-400">v.a.</span>{' '}
                  {formatAmount(amount)}
                </h2>
              )}

              <ItemOwner name={userName} />
            </div>

            <ul className="my-5 flex list-none flex-row items-center gap-2.5 p-0">
              <li className="text-xs text-slate-500">Valt onder:</li>
              {tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </ul>

            {currentUser && (
              <ClaimField
                currentUserId={currentUser.id}
                claimId={claimId}
                itemId={id}
              />
            )}
          </div>

          <div className="mt-10 flex-initial sm:mt-0 sm:w-2/3">
            {imageUrl && (
              <img
                className="mb-10 w-full object-cover"
                srcSet={`
                  /images/${id}-575w.webp 575w,
                  /images/${id}-900w.webp 900w,
                  /images/${id}-1400w.webp 1400w,
                `}
                sizes="
                  (min-width: 640px) 900px,
                  (min-width: 1280) 1400px,
                "
                loading="lazy"
                alt={name}
              />
            )}

            <div className="prose lg:prose-xl xl:prose-2xl">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
