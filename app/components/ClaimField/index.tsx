import Button from '~/components/Button';
import { useFetcher } from '@remix-run/react';

type Props = {
  currentUserId: string;
  itemId: string;
  claimId: string | null;
};

export default function ClaimField({ currentUserId, claimId, itemId }: Props) {
  const claim = useFetcher();

  if (claimId && (claimId !== currentUserId)) {
    return (
      <p className="w-full py-2 px-4 flex items-center justify-center rounded bg-slate-600 text-slate-100">
        Dit product is al geclaimed door iemand.
      </p>
    );
  }

  const claimed = claimId && (claimId === currentUserId);
  const pending = claim.state === 'submitting';

  return (
    <claim.Form action="/item/claim" method="post" className="mt-5">
      <input type="hidden" name="action" value={ claimed ? 'UNCLAIM' : 'CLAIM' } />
      <input type="hidden" name="userId" value={currentUserId} />
      <input type="hidden" name="itemId" value={itemId} />

      <div>
        { claimed ? (
          <Button type="submit" disabled={pending} pending={pending}>
            Ik weerleg mijn claim op deze!
          </Button>
        ) : (
          <Button primary type="submit" disabled={pending} pending={pending}>
            Ik claim deze!
          </Button>
        )}
      </div>
    </claim.Form>
  );
}
