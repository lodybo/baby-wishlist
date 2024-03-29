import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import SmallListItem from '~/components/SmallListItem';
import { getItemsByUser } from '~/models/items.server';
import { requireUser } from '~/session.server';
import { useUser } from '~/utils';

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const items = await getItemsByUser({ id: user.id });

  return json({ items });
};

const ProfileIndexPage = () => {
  const user = useUser();

  const { items } = useLoaderData<typeof loader>();

  return (
    <div className="w-full sm:w-3/4">
      <h1 className="mb-5 text-2xl lg:text-4xl">Hallo {user.name}</h1>
      {items.length ? (
        <p className="mb-5">Dit zijn de items die door jou zijn geclaimed:</p>
      ) : (
        <p className="mb-5">Er zijn nog geen items door jou geclaimed.</p>
      )}

      <ul className="space-y-5">
        {items.map((item) => (
          <SmallListItem
            key={item.id}
            item={item}
            actionRow={
              <>
                <Form action="/item.claim" method="post">
                  <input type="hidden" name="itemId" value={item.id} />
                  <input type="hidden" name="userId" value={user.id} />
                  <input type="hidden" name="action" value="UNCLAIM" />
                  <input type="hidden" name="referer" value="/profiel" />

                  <Button danger type="submit">
                    <Icon prefix="far" name="square-check" />
                  </Button>
                </Form>
              </>
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default ProfileIndexPage;
