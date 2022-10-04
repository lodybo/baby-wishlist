import Button from '~/components/Button';
import { useFetcher } from '@remix-run/react';

type Props = {
  currentUserId: string;
  itemId: string;
  claimId: string | null;
};

export default function ClaimField({ currentUserId, claimId, itemId }: Props) {
  const claim = useFetcher();

  if (claimId && claimId !== currentUserId) {
    return (
      <p className="flex w-full items-center justify-center rounded bg-slate-600 py-2 px-4 text-slate-100">
        Dit product is al geclaimed door iemand.
      </p>
    );
  }

  const claimed = claimId && claimId === currentUserId;
  const pending = claim.state === 'submitting';

  return (
    <claim.Form action="/item/claim" method="post" className="mt-5">
      <input
        type="hidden"
        name="action"
        value={claimed ? 'UNCLAIM' : 'CLAIM'}
      />
      <input type="hidden" name="userId" value={currentUserId} />
      <input type="hidden" name="itemId" value={itemId} />

      <div>
        {claimed ? (
          <Button
            className="w-full"
            primary
            type="submit"
            disabled={pending}
            pending={pending}
          >
            Ik weerleg mijn claim op deze!
          </Button>
        ) : (
          <Button
            className="w-full"
            secondary
            type="submit"
            disabled={pending}
            pending={pending}
          >
            Ik claim deze!
          </Button>
        )}
      </div>
    </claim.Form>
  );
}
