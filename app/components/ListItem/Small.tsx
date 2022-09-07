import type { ReactNode } from 'react';
import { Item } from '~/models/items.server';

type Props = {
  item: Pick<Item, 'id' | 'name' | 'imageUrl'> & { claimedUserName?: string };
  actionRow: ReactNode;
};

export default function SmallListItem({
  item: { id, name, imageUrl, claimedUserName },
  actionRow,
}: Props) {
  return (
    <li className="flex h-20 flex-row items-center gap-5">
      {imageUrl && (
        <img className="h-full w-20 object-cover" src={imageUrl} alt={name} />
      )}

      <div>
        <p className="text-xl">{name}</p>
        {claimedUserName && (
          <small className="text-sm">Geclaimed door {claimedUserName}</small>
        )}
      </div>

      <div className="ml-auto flex flex-row gap-2.5">{actionRow}</div>
    </li>
  );
}
