import { useRef, useState } from 'react';
import UserField from '~/components/SelectUserField/UserField';
import type { User } from '~/models/user.server';
import { useUser } from '~/utils';
import { findUser } from './utils';

type Props = {
  users: User[];
};

export default function SelectUserField({ users }: Props) {
  const user = useUser();
  const fieldRef = useRef<HTMLDetailsElement>(null);

  const currentAdminUser = findUser(users, user);
  const [ selectedUser, setSelectedUser ] = useState(currentAdminUser!);

  const handleSelect = (u: User) => {
    const match = findUser(users, u);
    setSelectedUser(match!);

    if (fieldRef.current) {
      fieldRef.current.open = false;
    }
  }

  return (
    <details
      className="
        flex
        flex-row
        rounded
        border
        border-slate-300
        focus-within:ring
        focus-within:ring-primary
        focus-within:ring-offset-2
        py-2
        place-items-center
        cursor-pointer
        bg-transparent
        hover:bg-slate-100
        open:bg-slate-100
        transition
      "
      ref={fieldRef}
    >
      <summary className="focus:outline-none select-none px-2">
        <UserField name={selectedUser.name} />
      </summary>

      <ul className="flex flex-col gap-0 mt-4">
        {users.map(user => (
          <li
            className="p-4 bg-transparent hover:bg-cyan-100 transition"
            key={user.id}
            onClick={() => { handleSelect(user) }}
          >
            { user.name }
          </li>
        ))}
      </ul>
    </details>
  );
}
