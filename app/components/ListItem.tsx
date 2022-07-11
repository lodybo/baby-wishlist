import type { Item } from '@prisma/client';

export type Props = Omit<Item, 'amount' | 'createdAt' | 'updatedAt' | 'userId'>;

export default function ListItem({
  id,
  name,
  description,
  imageUrl,
  tags,
}: Props) {
  return (
    <li
      key={id}
      className="group mb-10 cursor-pointer overflow-hidden rounded border border-slate-200 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg motion-reduce:transition-none sm:flex-1"
    >
      <div className="h-48 w-full overflow-hidden">
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
            <li
              className="w-fit rounded-xl bg-slate-100 px-2.5 text-xs text-slate-900 transition hover:bg-slate-200"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
