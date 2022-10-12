import Button from '~/components/Button';
import { useFetcher } from '@remix-run/react';

type Props = {
  currentUserId: string | undefined;
  itemId: string;
  claimId: string | null;
  claimed: boolean;
};

export default function ClaimField({
  currentUserId,
  claimId,
  claimed,
  itemId,
}: Props) {
  const claim = useFetcher();

  if (claimed) {
    return (
      <p className="min-h-14 mt-5 flex w-full items-center justify-center rounded bg-slate-600 py-2 px-4 font-handwritten text-3xl text-slate-100">
        Dit product is al geclaimed door iemand.
      </p>
    );
  }

  const isClaimed = claimId && claimId === currentUserId;
  const isPending = claim.state === 'submitting';

  return (
    <claim.Form action="/item/claim" method="post" className="mt-5">
      <input
        type="hidden"
        name="action"
        value={isClaimed ? 'UNCLAIM' : 'CLAIM'}
      />
      <input type="hidden" name="userId" value={currentUserId} />
      <input type="hidden" name="itemId" value={itemId} />

      <div>
        {isClaimed ? (
          <Button
            className="min-h-14 w-full font-handwritten text-3xl"
            primary
            type="submit"
            disabled={isPending}
            pending={isPending}
          >
            Ik kies iets anders
          </Button>
        ) : (
          <Button
            className="min-h-14 w-full font-handwritten text-3xl"
            secondary
            type="submit"
            disabled={isPending}
            pending={isPending}
          >
            Ik claim dit!
          </Button>
        )}
      </div>
    </claim.Form>
  );
}
