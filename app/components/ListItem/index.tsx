import type { Item } from '@prisma/client';
import { Link } from '@remix-run/react';
import Tag from '~/components/Tag';

export type Props = Omit<Item, 'amount' | 'createdAt' | 'updatedAt' | 'userId'>;

export default function Index({
  id,
  name,
  description,
  imageUrl,
  tags,
}: Props) {
  return (
    <li
      key={id}
      className="group mb-10 w-full max-w-sm flex-initial cursor-pointer overflow-hidden rounded border border-slate-200 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg motion-reduce:transition-none"
    >
      <Link to={id}>
        <div className="h-48 w-full overflow-hidden lg:h-80">
          <img
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110 motion-reduce:transition-none"
            src={imageUrl || ''}
            alt={name}
          />
        </div>

        <div className="p-2.5">
          <h2 className="mb-1 text-2xl">{name}</h2>

          <p className="text-sm">{description}</p>

          <ul className="my-2.5">
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </ul>
        </div>
      </Link>
    </li>
  );
}
