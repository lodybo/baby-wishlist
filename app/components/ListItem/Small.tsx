import type { ReactNode } from 'react';
import type { Item } from '~/models/items.server';

type Props = {
  item: Pick<Item, 'id' | 'name' | 'imageUrl'> & { claimedUserName?: string };
  actionRow: ReactNode;
  showClaimedItems?: boolean;
};

export default function SmallListItem({
  item: { id, name, imageUrl, claimedUserName },
  actionRow,
  showClaimedItems,
}: Props) {
  return (
    <li className="flex h-20 flex-row items-center gap-5">
      {imageUrl && (
        <img
          className="h-full w-20 object-cover"
          srcSet={`
            /images/${id}-80w.webp,
            /images/${id}-160w.webp 2x,
            /images/${id}-240w.webp 3x,
          `}
          src={imageUrl}
          loading="lazy"
          alt={name}
        />
      )}

      <div>
        <p className="text-xl">{name}</p>
        {showClaimedItems && claimedUserName && (
          <small className="text-sm">Geclaimed door {claimedUserName}</small>
        )}
      </div>

      <div className="ml-auto flex flex-row gap-2.5">{actionRow}</div>
    </li>
  );
}
