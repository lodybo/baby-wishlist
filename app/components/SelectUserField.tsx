import classnames from 'classnames';
import { useRef, useState } from 'react';
import UserField from '~/components/UserField';
import { findUser } from '~/models/user.server';
import type { User } from '~/models/user.server';

type Props = {
  name: string;
  users: User[];
  hideAvatars?: boolean;
  includeEmptyOption?: boolean;
  defaultValue?: User | undefined;
};

export default function SelectUserField({
  name,
  users,
  hideAvatars = false,
  includeEmptyOption = false,
  defaultValue,
}: Props) {
  const fieldRef = useRef<HTMLDetailsElement>(null);

  const [selectedUser, setSelectedUser] = useState<User | 'none'>(
    defaultValue || 'none',
  );

  const handleSelect = (u: User | undefined) => {
    let match: User | 'none' = 'none';

    if (u) {
      const result = findUser(users, u);
      if (result) {
        match = result;
      }
    }

    setSelectedUser(match!);

    if (fieldRef.current) {
      fieldRef.current.open = false;
    }
  };

  return (
    <>
      <input
        type="hidden"
        name={name}
        value={selectedUser !== 'none' ? selectedUser.id : selectedUser}
      />

      <details
        className="
          focus-within:ring-primary
          bg-transparent
          flex
          flex-row
          place-items-center
          rounded
          border
          border-slate-300
          py-2
          transition
          open:bg-slate-100
          focus-within:ring
          focus-within:ring-offset-2
          hover:bg-slate-100
        "
        ref={fieldRef}
      >
        <summary className="cursor-pointer select-none px-2 focus:outline-none">
          <UserField
            name={selectedUser !== 'none' ? selectedUser.name : 'Niemand'}
            hideAvatar={hideAvatars}
          />
        </summary>

        <ul className="mt-4 flex flex-col gap-0">
          {includeEmptyOption && (
            <li
              key="undefined"
              className={classnames('bg-transparent p-4 transition', {
                'hover:bg-cyan-100': selectedUser !== 'none',
                'cursor-pointer': selectedUser !== 'none',
                'text-slate-200': selectedUser === 'none',
                'cursor-default': selectedUser === 'none',
                'pointer-events-none': selectedUser === 'none',
              })}
              onClick={() => {
                handleSelect(undefined);
              }}
            >
              Niemand
            </li>
          )}

          {users.map((user) => (
            <li
              key={user.id}
              className={classnames('bg-transparent p-4 transition', {
                'hover:bg-cyan-100':
                  selectedUser !== 'none' ? selectedUser.id !== user.id : true,
                'cursor-pointer':
                  selectedUser !== 'none' ? selectedUser.id !== user.id : true,
                'text-slate-200':
                  selectedUser !== 'none' ? selectedUser.id === user.id : false,
                'cursor-default':
                  selectedUser !== 'none' ? selectedUser.id === user.id : false,
                'pointer-events-none':
                  selectedUser !== 'none' ? selectedUser.id === user.id : false,
              })}
              onClick={() => {
                handleSelect(user);
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
