import { useFetcher } from '@remix-run/react';
import type { Item } from '~/models/items.server';
import type { User } from '~/models/user.server';
import Label from '~/components/Label';
import TextInput from '~/components/Inputs/TextInput';
import NumberInput from '~/components/Inputs/NumberInput';
import TagField from '~/components/TagField';
import SelectUserField from '~/components/SelectUserField';

type Props = {
  state: 'new' | 'edit',
  item?: Omit<Item, 'createdAt' | 'updatedAt'>,
  users: User[];
};

export default function ItemForm({ state, item, users }: Props) {
  const fetcher = useFetcher();

  let action = '/admin/item/nieuw';
  if (state === 'edit' && item) {
    action = `/admin/item/bewerk/${item.id}`;
  }

  const adminUsers = users.filter(u => u.role === 'ADMIN');

  return (
    <fetcher.Form className="w-2/3 flex flex-col gap-5 mb-10" action={action} method="post">
      <Label caption="Naam">
        <TextInput name="naam" autoComplete="off" />
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
        <SelectUserField users={adminUsers} />
      </Label>
    </fetcher.Form>
  );
}
