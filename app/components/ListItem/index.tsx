import type { Item } from '~/models/items.server';
import { Link } from '@remix-run/react';
import Tag from '~/components/Tag';

export type Props = Omit<Item, 'amount' | 'userId' | 'claimId'>;

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
      className="group cursor-pointer overflow-hidden rounded border border-slate-200 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg motion-reduce:transition-none"
    >
      <Link to={`/item/${id}`}>
        <div className="h-48 w-full overflow-hidden lg:h-80">
          <img
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110 motion-reduce:transition-none"
            srcSet={`
              /images/${id}-575w.webp 575w,
              /images/${id}-900w.webp 900w,
              /images/${id}-1400w.webp 1400w,
            `}
            sizes="
              (min-width: 1280px) 900px,
              (min-width: 1536px) 1400px
            "
            loading="lazy"
            alt={name}
          />
        </div>

        <div className="py-2.5 px-5">
          <h2 className="mb-1 font-handwritten text-5xl">{name}</h2>

          <ul className="my-2.5 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </ul>

          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </Link>
    </li>
  );
}
