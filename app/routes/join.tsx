import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { useState, useEffect } from 'react';
import invariant from 'tiny-invariant';
import PasswordInput from '~/components/Inputs/PasswordInput';
import TextInput from '~/components/Inputs/TextInput';

import { createUserSession, getUserId } from '~/session.server';

import { createUser, getUserByEmail } from '~/models/user.server';
import type { User } from '~/models/user.server';
import { safeRedirect } from '~/utils';

import AuthPageLayout from '~/layouts/AuthPage';
import Label from '~/components/Label';

import noPass from '~/images/you-shall-not-pass.png';
import Button from '~/components/Button';
import EmailInput from '~/components/Inputs/EmailInput';
import {
  validateAccessCode,
  validatePassword,
  validateEmail,
  validateName,
} from '~/validations';

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect('/');
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const access = formData.get('access') === 'true';

  let errors: Record<string, string | undefined> = {};
  let fields: Record<string, string | undefined> = {};

  if (!access) {
    const { 'access-code': code } = Object.fromEntries(formData);

    errors.access = validateAccessCode(code);

    if (Object.values(errors).some(Boolean)) {
      return json(
        { errors, fields, access: { granted: false } },
        { status: 400 },
      );
    }

    return json(
      {
        errors: null,
        fields: null,
        access: {
          granted: true,
        },
      },
      { status: 200 },
    );
  }

  const { name, email, password } = Object.fromEntries(formData);
  let role: User['role'] = 'USER';
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/');

  if (formData.get('role') === 'admin') {
    role = 'ADMIN';
  }

  errors = {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
  };

  invariant(typeof name === 'string', 'Name is of an incorrect type');
  invariant(typeof email === 'string', 'Email is of an incorrect type');
  invariant(typeof password === 'string', 'Password is of an incorrect type');
  invariant(typeof role === 'string', 'Role is of an incorrect type');

  fields = { name, email, password };

  if (Object.values(errors).some(Boolean)) {
    return json({ errors, fields, access: { granted: true } }, { status: 400 });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          name: null,
          email: 'Dit e-mailadres is al in gebruik',
          password: null,
          access: null,
        },
        fields,
        access: null,
      },
      { status: 400 },
    );
  }

  const user = await createUser(name, email, password, role);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Registreren by Cody's wensjes",
  };
};

export default function Join() {
  const [role, setRole] = useState<string>('user');
  const [redirectTo, setRedirectTo] = useState<string | undefined>(undefined);

  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();
  const access = actionData?.access?.granted || false;

  useEffect(() => {
    const customRole = searchParams.get('use_role');
    if (customRole) {
      setRole(customRole);
    }

    const customRedirectTo = searchParams.get('redirectTo');
    if (customRedirectTo) {
      setRedirectTo(customRedirectTo);
    }
  }, [searchParams]);

  if (!access) {
    return (
      <AuthPageLayout>
        <div className="mt-10 mb-20">
          <img
            className="scale-100 animate-throb motion-reduce:animate-none"
            src={noPass}
            alt="You shall not pass!"
          />
        </div>

        <main className="prose mb-16 lg:prose-xl">
          <h1 className="">Hola, een momentje...</h1>

          <p>
            We willen liever niet dat zomaar iedereen zich aan kan melden en een
            kadootje voor Cody kan kopen. Dit is iets wat we willen delen met
            onze vrienden en familie. Daarom willen we je vragen om ons een
            appje te sturen als je geen account hebt.
          </p>

          <p>
            Wat we dan doen is je een code sturen die je hieronder kan invullen.
            Is de code correct, dan zie je het inschrijfformulier.
          </p>

          <p>Kom je er niet uit? Stuur ons dan een berichtje.</p>

          <Form className="not-prose" method="post">
            <input type="hidden" name="access" value="false" />

            <Label caption="Voer je access code in">
              <TextInput
                name="access-code"
                autoComplete="false"
                autoFocus={true}
              />
            </Label>

            {actionData?.errors?.access && (
              <div className="pt-1 text-red-700" id="email-error">
                {actionData.errors.access}
              </div>
            )}

            <Button className="mt-4" type="submit" primary>
              Ik wil verder
            </Button>
          </Form>
        </main>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout>
      <h2 className="mb-10 text-4xl md:text-6xl">
        Geef je op voor Cody's wensjes!
      </h2>

      <Form method="post" className="space-y-6" noValidate>
        <input type="hidden" name="role" value={role} />
        <input type="hidden" name="access" value="true" />

        <Label caption="Wat is je naam?">
          <TextInput
            id="name"
            autoFocus={true}
            name="name"
            autoComplete="name"
            aria-invalid={actionData?.errors?.name ? true : undefined}
            aria-describedby="name-error"
          />
          {actionData?.errors?.name && (
            <p className="pt-1 text-red-700" id="name-error">
              {actionData.errors.name}
            </p>
          )}
        </Label>

        <Label caption="E-mailadres">
          <EmailInput
            id="email"
            required
            name="email"
            autoComplete="email"
            aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="email-error"
          />
          {actionData?.errors?.email && (
            <p className="pt-1 text-red-700" id="email-error">
              {actionData.errors.email}
            </p>
          )}
        </Label>

        <Label caption="Wachtwoord">
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            aria-invalid={actionData?.errors?.password ? true : undefined}
            aria-describedby="password-error"
          />
          {actionData?.errors?.password && (
            <p className="pt-1 text-red-700" id="password-error">
              {actionData.errors.password}
            </p>
          )}
        </Label>

        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div className="flex flex-row items-center justify-between">
          <Button type="submit" primary>
            Account aanmaken
          </Button>
          <p className=" text-sm text-gray-500">
            Heb je al een account?{' '}
            <Link
              className="text-blue-500 underline"
              to={{
                pathname: '/login',
                search: searchParams.toString(),
              }}
            >
              Log dan in
            </Link>
          </p>
        </div>
      </Form>
    </AuthPageLayout>
  );
}
