import classnames from 'classnames';
import Anchor from '~/components/Anchor';
import type { User } from '~/models/user.server';
import type { Theme } from '~/types/Theme';

type Props = {
  role: User['role'];
  theme: Theme;
};

export default function ProfileMenu({ role, theme = 'cyan' }: Props) {
  return (
    <nav
      className={classnames('w-full flex-1 p-8 md:w-1/4', {
        'bg-lime-100': theme === 'lime',
        'bg-cyan-100': theme === 'cyan',
        'bg-gold-100': theme === 'gold',
      })}
    >
      <ul className="flex flex-col gap-2.5">
        <li>
          <Anchor theme={theme} to="/profiel">
            Mijn geclaimde items
          </Anchor>
        </li>

        <li>
          <Anchor theme={theme} to="/profiel/instellingen">
            Instellingen
          </Anchor>
        </li>

        {role === 'ADMIN' && (
          <>
            <li className="mt-5 font-semibold">Admin opties</li>
            <li>
              <Anchor theme={theme} to="/admin">
                Items beheren
              </Anchor>
            </li>

            <li>
              <Anchor theme={theme} to="/admin/gebruikers">
                Gebruikers beheren
              </Anchor>
            </li>

            <li>
              <Anchor theme={theme} to="/admin/hergenereer">
                Hergenereer afbeeldingen
              </Anchor>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
