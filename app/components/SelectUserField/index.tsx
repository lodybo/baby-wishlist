import classnames from 'classnames';
import { useRef, useState } from 'react';
import UserField from '~/components/SelectUserField/UserField';
import type { User } from '~/models/user.server';
import { findUser } from './utils';

type Props = {
  name: string;
  users: User[];
  hideAvatars?: boolean;
  includeEmptyOption?: boolean;
  defaultValue?: User | undefined;
};

export default function SelectUserField({ name, users, hideAvatars = false, includeEmptyOption = false, defaultValue, }: Props) {
  const fieldRef = useRef<HTMLDetailsElement>(null);

  const [ selectedUser, setSelectedUser ] = useState<User | 'none'>(defaultValue || 'none');

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
  }

  return (
    <>
      <input type="hidden" name={name} value={selectedUser !== 'none' ? selectedUser.id : selectedUser} />

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
          bg-transparent
          hover:bg-slate-100
          open:bg-slate-100
          transition
        "
        ref={fieldRef}
      >
        <summary className="focus:outline-none select-none px-2 cursor-pointer">
          <UserField name={selectedUser !== 'none' ? selectedUser.name : 'Niemand'} hideAvatar={hideAvatars} />
        </summary>

        <ul className="flex flex-col gap-0 mt-4">
          { includeEmptyOption && (
            <li
              key="undefined"
              className={ classnames(
                'p-4 bg-transparent transition',
                {
                  'hover:bg-cyan-100': selectedUser !== 'none',
                  'cursor-pointer': selectedUser !== 'none',
                  'text-slate-200': selectedUser === 'none',
                  'cursor-default': selectedUser === 'none',
                  'pointer-events-none': selectedUser === 'none',
                }
              )}
              onClick={() => { handleSelect(undefined) }}
            >Niemand</li>
          )}

          {users.map(user => (
            <li
              key={user.id}
              className={ classnames(
                'p-4 bg-transparent transition',
                {
                  'hover:bg-cyan-100': selectedUser !== 'none' ? selectedUser.id !== user.id : true,
                  'cursor-pointer': selectedUser !== 'none' ? selectedUser.id !== user.id : true,
                  'text-slate-200': selectedUser !== 'none' ? selectedUser.id === user.id : false,
                  'cursor-default': selectedUser !== 'none' ? selectedUser.id === user.id : false,
                  'pointer-events-none': selectedUser !== 'none' ? selectedUser.id === user.id : false,
                }
              )}
              onClick={() => { handleSelect(user) }}
            >
              { user.name }
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
