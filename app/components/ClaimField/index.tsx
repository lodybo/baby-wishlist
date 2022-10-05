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
      <p className="min-h-14 flex w-full items-center justify-center rounded bg-slate-600 py-2 px-4 font-handwritten text-3xl text-slate-100">
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
            className="min-h-14 w-full font-handwritten text-3xl"
            primary
            type="submit"
            disabled={pending}
            pending={pending}
          >
            Iemand anders mag dit claimen
          </Button>
        ) : (
          <Button
            className="min-h-14 w-full font-handwritten text-3xl"
            secondary
            type="submit"
            disabled={pending}
            pending={pending}
          >
            Ik claim dit!
          </Button>
        )}
      </div>
    </claim.Form>
  );
}
