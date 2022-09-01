import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import Checkbox from '~/components/Inputs/Checkbox';
import EmailInput from '~/components/Inputs/EmailInput';
import PasswordInput from '~/components/Inputs/PasswordInput';
import Label from '~/components/Label';

import { createUserSession, getUserId } from '~/session.server';
import { verifyLogin } from '~/models/user.server';
import { safeRedirect, validateEmail } from '~/utils';
import Button from '~/components/Button';
import AuthPageLayout from '~/layouts/AuthPage';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect('/');
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/');
  const remember = formData.get('remember');

  // TODO: Granular validation
  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: 'Het e-mailadres is ongeldig' } },
      { status: 400 },
    );
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json<ActionData>(
      { errors: { password: 'Het wachtwoord is verplicht' } },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: 'Het wachtwoord is te kort' } },
      { status: 400 },
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: 'Het wachtwoord of e-mailadres is ongeldig' } },
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
  const actionData = useActionData() as ActionData;

  return (
    <AuthPageLayout>
      <h2 className="mb-10 text-4xl md:text-6xl">Log in om de lijst te zien</h2>

      <Form method="post" className="space-y-6" noValidate>
        <div>
          <Label caption="E-mailadres">
            <EmailInput
              id="email"
              required
              autoFocus={true}
              name="email"
              autoComplete="email"
              aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="email-error"
            />
            {actionData?.errors?.email && (
              <div className="pt-1 text-red-700" id="email-error">
                {actionData.errors.email}
              </div>
            )}
          </Label>
        </div>

        <div className="flex flex-col">
          <Label caption="Wachtwoord">
            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              aria-invalid={actionData?.errors?.password ? true : undefined}
              aria-describedby="password-error"
            />
            {actionData?.errors?.password && (
              <div className="pt-1 text-red-700" id="password-error">
                {actionData.errors.password}
              </div>
            )}
          </Label>
        </div>

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
