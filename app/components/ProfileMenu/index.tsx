import Anchor from '~/components/Anchor';
import { User } from '~/models/user.server';

type Props = {
  role: User['role'];
};

export default function ProfileMenu({ role }: Props) {
  return (
    <nav className="w-full flex-1 bg-slate-100 p-8 md:w-1/4">
      <ul className="flex flex-col gap-2.5">
        <li>
          <Anchor to="/profiel">Mijn geclaimde items</Anchor>
        </li>

        <li>
          <Anchor to="/profiel/instellingen">Instellingen</Anchor>
        </li>

        {role === 'ADMIN' && (
          <>
            <li className="mt-5 font-semibold">Admin opties</li>
            <li>
              <Anchor to="/admin">Items beheren</Anchor>
            </li>

            <li>
              <Anchor to="/admin/gebruikers">Gebruikers beheren</Anchor>
            </li>

            <li>
              <Anchor to="/admin/hergenereer">Hergenereer afbeeldingen</Anchor>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
