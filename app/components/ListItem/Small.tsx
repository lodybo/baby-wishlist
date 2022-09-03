import type { ReactNode } from 'react';
import type { Item } from '~/models/items.server';

type Props = {
  item: Omit<Item, 'amount' | 'userId' | 'claimId'>;
  actionRow: ReactNode;
};

export default function SmallListItem({
  item: { id, name, imageUrl },
  actionRow,
}: Props) {
  return (
    <li className="flex h-20 flex-row items-center gap-5">
      {imageUrl && (
        <img className="h-full w-20 object-cover" src={imageUrl} alt={name} />
      )}

      <p className="text-xl">{name}</p>

      <div className="ml-auto flex flex-row gap-2.5">{actionRow}</div>
    </li>
  );
}
