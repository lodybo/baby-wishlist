import Avatar from '~/components/Avatar';

type Props = {
  name: string;
};

export default function UserField({ name }: Props) {
  return (
    <span className="flex flex-row gap-5 place-items-center">
      <Avatar name={name} alt={name} />

      <p className="text-lg text-slate-700">{name}</p>
    </span>
  );
}
