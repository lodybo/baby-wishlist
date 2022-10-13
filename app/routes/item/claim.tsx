import type { ActionArgs } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import type { Action } from '~/types/Action';
import {
  claimItem,
  unclaimItem,
  getItemClaimStatus,
} from '~/models/items.server';

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const { itemId, userId, action, referer } = Object.fromEntries(
    formData,
  ) as unknown as Action;
  invariant(itemId, 'Geen item gevonden');
  invariant(action, 'Geen actie gevonden');

  switch (action) {
    case 'CLAIM':
      const claimStatus = await getItemClaimStatus({ itemId });

      if (claimStatus && claimStatus.claimId) {
        return json({ claimed: true }, { status: 409 });
      }

      await claimItem({
        itemId,
        claimUserId: userId,
      });
      break;

    case 'UNCLAIM':
      await unclaimItem({
        itemId,
      });
      break;
  }

  const redirectUrl = referer || `/item/${itemId}`;
  return redirect(redirectUrl);
};
