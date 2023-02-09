import Avatar from '~/components/Avatar';

type Props = {
  name: string;
  hideAvatar?: boolean;
};

export default function UserField({ name, hideAvatar }: Props) {
  return (
    <span className="flex flex-row place-items-center gap-5">
      {!hideAvatar && <Avatar name={name} alt={name} />}

      <p className="text-lg text-slate-700">{name}</p>
    </span>
  );
}
