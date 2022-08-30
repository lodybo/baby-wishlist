import { useFetcher } from '@remix-run/react';
import Button from '~/components/Button';
import EditorField from '~/components/EditorField';
import Label from '~/components/Label';
import TextInput from '~/components/Inputs/TextInput';
import NumberInput from '~/components/Inputs/NumberInput';
import TagField from '~/components/TagField';
import SelectUserField from '~/components/SelectUserField';
import type { SerializedItem } from '~/models/items.server';
import type { User } from '~/models/user.server';
import { useUser } from '~/utils';

type Props = {
  state: 'new' | 'edit',
  item?: SerializedItem,
  users: User[];
};

export interface ItemFormData {
  id: string;
  name: string;
  amount: string;
  imageUrl: string;
  tags: string;
  itemOwner: string;
  claimedBy: string | 'none';
  description: string;
}

export default function ItemForm({ state, item, users }: Props) {
  const user = useUser();
  const fetcher = useFetcher();

  const pending = fetcher.state === 'submitting';

  let action = '/admin/item/nieuw';
  if (state === 'edit' && item) {
    action = `/admin/item/bewerk/${item.id}`;
  }

  const { id, name, amount, imageUrl, tags, claimId, description, userId } = item || {};

  const adminUsers = users.filter(u => u.role === 'ADMIN');

  let currentAdminUser;
  if (userId) {
    currentAdminUser = adminUsers.find(u => u.id === userId);
  } else {
    currentAdminUser = adminUsers.find(u => u.id === user.id);
  }

  let claimUser;
  if (claimId) {
    claimUser = users.find(u => u.id === claimId);
  }

  return (
    <fetcher.Form className="w-full flex flex-col gap-10 mb-20" action={action} method="post">
      { state === 'edit' && (
        <input type="hidden" name="id" value={id} />
      )}

      <div className="flex flex-row gap-5">
        <Label className="flex-1" caption="Wat is het?" subCaption="Oftewel: hoe heet het item?">
          <TextInput name="name" autoComplete="off" defaultValue={name} />
        </Label>

        <Label className="flex-1" caption="Wat is het bedrag?" subCaption="Vanaf-prijs, gebruik een punt i.p.v. comma">
          <NumberInput name="amount" icon="euro-sign" defaultValue={amount || undefined} />
        </Label>
      </div>

      <div className="flex flex-row h-32 gap-5">
        <Label className="flex-1" caption="Afbeeldings URL" subCaption="Copy & paste van een website naar keuze">
          <TextInput name="imageUrl" defaultValue={imageUrl || undefined} />
        </Label>

        <Label className="flex-1" caption="Tags" subCaption="Onder welke categoriëen valt dit?">
          <TagField name="tags" defaultValue={tags} />
        </Label>
      </div>

      <div className="flex flex-row gap-5">
        <Label className="flex-1" caption="Wie vraagt hierom?">
          <SelectUserField name="itemOwner" users={adminUsers} defaultValue={currentAdminUser} />
        </Label>

        <Label className="flex-1" caption="Heeft iemand dit al geclaimed?">
          <SelectUserField name="claimedBy" users={users} hideAvatars includeEmptyOption defaultValue={claimUser} />
        </Label>

      </div>

      <Label caption="Beschrijving">
        <EditorField name="description" defaultValue={description} />
      </Label>

      <div className="w-full flex">
        <Button className="ml-auto" primary type="submit" pending={pending} disabled={pending}>Toevoegen</Button>
      </div>
    </fetcher.Form>
  );
}
