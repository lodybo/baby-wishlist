import { useFetcher } from '@remix-run/react';
import type { Item } from '~/models/items.server';
import Label from '~/components/Label';
import TextInput from '~/components/Inputs/TextInput';
import NumberInput from '~/components/Inputs/NumberInput';
import TagField from '~/components/TagField';

type Props = {
  state: 'new' | 'edit',
  item?: Omit<Item, 'createdAt' | 'updatedAt'>,
};

export default function ItemForm({ state, item }: Props) {
  const fetcher = useFetcher();

  let action = '/admin/item/nieuw';
  if (state === 'edit' && item) {
    action = `/admin/item/bewerk/${item.id}`;
  }

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
    </fetcher.Form>
  );
}
