import Avatar from '~/components/Avatar';

type Props = {
  name: string;
  hideAvatar?: boolean;
};

export default function UserField({ name, hideAvatar }: Props) {
  return (
    <span className="flex flex-row gap-5 place-items-center">
      { !hideAvatar && (
        <Avatar name={name} alt={name} />
      )}

      <p className="text-lg text-slate-700">{name}</p>
    </span>
  );
}
