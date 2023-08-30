import type { ReactNode } from 'react';
import { Form } from '@remix-run/react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classnames from 'classnames';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import type { Theme } from '~/types/Theme';

type Props = {
  userHasLoggedIn: boolean;
  theme: Theme;
};

export default ({ userHasLoggedIn, theme }: Props) => (
  <NavigationMenu.Root className="relative z-[1] flex w-1/4 justify-end">
    <NavigationMenuList className="flex sm:hidden" theme={theme}>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger className="relative text-2xl">
          <Icon name="bars" />
        </NavigationMenu.Trigger>
        <NavigationMenu.Content className="absolute top-0 left-0 w-full">
          <ul className="one m-0 flex list-none flex-col gap-5 p-8">
            <li>
              <LinkItem href="/lijst">Lijst</LinkItem>
            </li>

            {userHasLoggedIn ? (
              <>
                <li>
                  <LinkItem href="/profiel">Profiel</LinkItem>
                </li>

                <li>
                  <Form method="post" action="/logout">
                    <Button jumpOut secondary type="submit">
                      Uitloggen
                    </Button>
                  </Form>
                </li>
              </>
            ) : (
              <li>
                <LinkItem href="/login?redirectTo=/">
                  <Button jumpOut secondary lighterContrast>
                    Inloggen
                  </Button>
                </LinkItem>
              </li>
            )}
          </ul>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenuList>

    <NavigationMenuList className="hidden sm:flex" theme={theme}>
      <LinkItem href="/lijst">Lijst</LinkItem>

      {userHasLoggedIn ? (
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="relative text-2xl">
            <Icon name="user" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-0 left-0 w-full">
            <ul className="one m-0 flex list-none flex-col gap-5 p-8">
              <li>
                <LinkItem href="/profiel">Profiel</LinkItem>
              </li>

              <li>
                <Form method="post" action="/logout">
                  <Button jumpOut secondary type="submit">
                    Uitloggen
                  </Button>
                </Form>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      ) : (
        <NavigationMenu.Item>
          <LinkItem href="/login?redirectTo=/">
            <Button jumpOut secondary lighterContrast>
              Inloggen
            </Button>
          </LinkItem>
        </NavigationMenu.Item>
      )}
    </NavigationMenuList>

    <div className="absolute top-full left-[calc(100%-10rem)] flex w-40 justify-end perspective-[2000px]">
      <NavigationMenu.Viewport
        className={classnames(
          'data-[state=closed]:animate-scaleOut] relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] border shadow-md transition-[width,_height] duration-300 data-[state=open]:animate-scaleIn',
          {
            'border-cyan-500 bg-cyan-50': theme === 'cyan',
            'border-lime-500 bg-lime-50': theme === 'lime',
            'border-gold-500 bg-gold-50': theme === 'gold',
          },
        )}
      />
    </div>
  </NavigationMenu.Root>
);

function NavigationMenuList({
  children,
  theme,
  className = '',
}: {
  children: ReactNode;
  theme: Theme;
  className?: string;
}) {
  return (
    <NavigationMenu.List
      className={classnames(
        'h-full flex-auto flex-row items-center justify-end gap-5',
        {
          'text-cyan-50': theme === 'cyan',
          'text-lime-50': theme === 'lime',
          'text-gold-50': theme === 'gold',
        },
        className,
      )}
    >
      {children}
    </NavigationMenu.List>
  );
}

function LinkItem({ href, children }: { href: string; children: ReactNode }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link
        className="flex flex-initial justify-center text-2xl sm:text-3xl"
        href={href}
      >
        {children}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
