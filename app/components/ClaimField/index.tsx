import Button from '~/components/Button';
import { Form } from '@remix-run/react';

type Props = {
  currentUserId: string;
  claimId: string | null;
};

export default function ClaimField({ currentUserId, claimId }: Props) {
  console.log({
    claimId,
    currentUserId,
  })
  if (claimId) {
    if (claimId === currentUserId) {
      return (
        <Form method="post" className="mt-5">
          <input type="hidden" name="action" value="UNCLAIM" />
          <input type="hidden" name="userId" value={currentUserId} />
          <Button type="submit">
            Ik weerleg mijn claim op deze!
          </Button>
        </Form>
      );
    } else {
      return (
        <p className="w-full py-2 px-4 flex items-center justify-center rounded bg-slate-600 text-slate-100">
          Dit product is al geclaimed door iemand.
        </p>
      );
    }
  }

  return (
    <Form method="post" className="mt-5">
      <input type="hidden" name="action" value="CLAIM" />
      <input type="hidden" name="userId" value={currentUserId} />
      <Button primary type="submit">
        Ik claim deze!
      </Button>
    </Form>
  );
}
