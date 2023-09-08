import type { ReactNode } from 'react';
import type { Item } from '~/models/items.server';

type Props = {
  item: Pick<Item, 'id' | 'name' | 'imageUrl' | 'claimed'> & {
    claimedUserName?: string;
  };
  actionRow: ReactNode;
  showClaimedItems?: boolean;
};

export default function SmallListItem({
  item: { id, name, imageUrl, claimedUserName, claimed },
  actionRow,
  showClaimedItems,
}: Props) {
  return (
    <li className="min-h-20 flex flex-row flex-wrap items-center gap-5">
      {imageUrl && (
        <img
          className="h-full w-20 object-cover"
          srcSet={`
            /image/${id}.webp?w=80w,
            /image/${id}.webp?w=160w 2x,
            /image/${id}.webp?w=240w 3x,
          `}
          src={imageUrl}
          loading="lazy"
          alt={name}
        />
      )}

      <div>
        <p className="text-xl">{name}</p>
        {showClaimedItems &&
          claimed &&
          (claimedUserName ? (
            <small className="text-sm">Geclaimed door {claimedUserName}</small>
          ) : (
            <small className="text-sm">Geclaimed door iemand</small>
          ))}
      </div>

      <div className="ml-auto flex w-full flex-row justify-end gap-2.5 sm:w-auto">
        {actionRow}
      </div>
    </li>
  );
}
