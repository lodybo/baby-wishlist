import { useFetcher } from '@remix-run/react';
import type { Item } from '~/models/items.server';
import type { User } from '~/models/user.server';
import Label from '~/components/Label';
import TextInput from '~/components/Inputs/TextInput';
import NumberInput from '~/components/Inputs/NumberInput';
import TagField from '~/components/TagField';
import SelectUserField from '~/components/SelectUserField';
import { useUser } from '~/utils';

type Props = {
  state: 'new' | 'edit',
  item?: Omit<Item, 'createdAt' | 'updatedAt'>,
  users: User[];
};

export interface ItemFormData {
  name: string;
  amount: string;
  imageUrl: string;
  tags: string[];
  itemOwner: string;
  claimedBy: string | 'none';
}

export default function ItemForm({ state, item, users }: Props) {
  const user = useUser();
  const fetcher = useFetcher();

  let action = '/admin/item/nieuw';
  if (state === 'edit' && item) {
    action = `/admin/item/bewerk/${item.id}`;
  }

  const adminUsers = users.filter(u => u.role === 'ADMIN');
  const currentAdminUser = adminUsers.find(u => u.id === user.id);

  return (
    <fetcher.Form className="w-2/3 flex flex-col gap-5 mb-10" action={action} method="post">
      <Label caption="Naam">
        <TextInput name="name" autoComplete="off" />
      </Label>

      <Label caption="Bedrag (v.a.)">
        <NumberInput name="amount" icon="euro-sign" />
      </Label>

      <Label caption="Afbeeldings URL" subCaption="Copy & paste van een website naar keuze">
        <TextInput name="imageUrl" />
      </Label>

      <Label caption="Tags">
        <TagField name="tags" />
      </Label>

      <Label caption="Namens wie vragen we dit?">
        <SelectUserField name="itemOwner" users={adminUsers} defaultValue={currentAdminUser} />
      </Label>

      <Label caption="Heeft iemand dit al geclaimed?">
        <SelectUserField name="claimedBy" users={users} hideAvatars includeEmptyOption />
      </Label>
    </fetcher.Form>
  );
}
