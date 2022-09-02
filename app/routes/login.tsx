import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import invariant from 'tiny-invariant';
import Checkbox from '~/components/Inputs/Checkbox';
import EmailInput from '~/components/Inputs/EmailInput';
import PasswordInput from '~/components/Inputs/PasswordInput';
import Label from '~/components/Label';

import { createUserSession, getUserId } from '~/session.server';
import { verifyLogin } from '~/models/user.server';
import { safeRedirect } from '~/utils';
import { validateEmail, validatePassword } from '~/validations';
import Button from '~/components/Button';
import AuthPageLayout from '~/layouts/AuthPage';

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect('/');
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/');
  const remember = formData.get('remember');

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    user: null,
  };

  invariant(typeof email === 'string', 'Email is of an incorrect type');
  invariant(typeof password === 'string', 'Password is of an incorrect type');

  const fields = { email, password };

  if (Object.values(errors).some(Boolean)) {
    return json({ errors, fields }, { status: 400 });
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      {
        errors: {
          email: null,
          password: null,
          user: 'Het wachtwoord of e-mailadres is ongeldig',
        },
        fields,
      },
      { status: 400 },
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === 'on',
    redirectTo,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: 'Log in om de lijst te zien',
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/lijst';
  const actionData = useActionData<typeof action>();

  return (
    <AuthPageLayout>
      <h2 className="mb-10 text-4xl md:text-6xl">Log in om de lijst te zien</h2>

      <Form method="post" className="space-y-6" noValidate>
        {actionData?.errors?.user && (
          <p className="pb-5 text-red-700">{actionData.errors.user}</p>
        )}

        <Label caption="E-mailadres">
          <EmailInput
            id="email"
            required
            autoFocus={true}
            name="email"
            autoComplete="email"
            defaultValue={actionData?.fields?.email || undefined}
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
            autoComplete="current-password"
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
        <Button className="ml-auto" type="submit" primary>
          Log in
        </Button>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox name="remember" caption="Herinner mij" />
          </div>

          <div className="text-center text-sm text-gray-500">
            Geen account?{' '}
            <Link
              className="text-blue-500 underline"
              to={{
                pathname: '/join',
                search: searchParams.toString(),
              }}
            >
              Geef je hier op.
            </Link>
          </div>
        </div>
      </Form>
    </AuthPageLayout>
  );
}
