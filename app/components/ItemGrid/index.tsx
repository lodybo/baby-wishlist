import ListItem from '~/components/ListItem';
import type { Item } from '~/models/items.server';

type Props = {
  items: Omit<Item, 'amount' | 'userId' | 'claimId'>[];
};

export default function ItemGrid({ items }: Props) {
  return (
    <ul className="block grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {items.map(({ id, name, imageUrl, description, tags }) => (
        <ListItem
          key={id}
          id={id}
          name={name}
          imageUrl={imageUrl}
          description={description}
          tags={tags}
        />
      ))}
    </ul>
  );
}
