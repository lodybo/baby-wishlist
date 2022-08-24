import type { ActionArgs } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import type { Action } from '~/types/Action';
import { claimItem, unclaimItem, getItemClaimStatus } from '~/models/items.server';

export const action = async ({ request, params }: ActionArgs) => {
  const formData = await request.formData();

  const { itemId, userId, action } = Object.fromEntries(formData) as unknown as Action;
  invariant(itemId, 'Geen item gevonden');
  invariant(userId, 'Geen gebruiker gevonden');
  invariant(action, 'Geen actie gevonden');

  switch (action) {
    case 'CLAIM':
      const claimStatus = await getItemClaimStatus({ itemId, });
      console.log({claimStatus})
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

  return redirect(`/item/${ itemId }`);
};
