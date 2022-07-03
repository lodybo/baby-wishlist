import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { useState, useEffect, useRef } from 'react';

import { getUserId, createUserSession } from '~/session.server';

import { createUser, getUserByEmail } from '~/models/user.server';
import type { User } from '~/models/user.server';
import { safeRedirect, validateEmail } from '~/utils';

import AuthPageLayout from '~/layouts/AuthPage';
import Label from '~/components/Label';
import Input from '~/components/Input';

import noPass from '~/images/you-shall-not-pass.png';
import Button from '~/components/Button';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect('/');
  return json({});
};

interface ActionData {
  access?: {
    granted: boolean;
  };
  errors?: {
    email?: string;
    password?: string;
    access?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const access = formData.get('access') === 'true';

  if (!access) {
    const code = formData.get('access-code');

    if (!code) {
      return json<ActionData>(
        { errors: { access: 'De code is verplicht.' } },
        { status: 400 },
      );
    }

    if (code !== process.env['ACCESS_CODE']) {
      return json<ActionData>(
        { errors: { access: 'Deze code is niet correct.' } },
        { status: 400 },
      );
    }

    return json<ActionData>(
      {
        access: {
          granted: true,
        },
      },
      { status: 200 },
    );
  }

  const email = formData.get('email');
  const password = formData.get('password');
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/');
  let role: User['role'] = 'USER';

  if (formData.get('role') === 'admin') {
    role = 'ADMIN';
  }

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: 'Email is invalid' } },
      { status: 400 },
    );
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json<ActionData>(
      { errors: { password: 'Password is required' } },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: 'Password is too short' } },
      { status: 400 },
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: 'A user already exists with this email' } },
      { status: 400 },
    );
  }

  const user = await createUser(email, password, role);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: 'Sign Up',
  };
};

export default function Join() {
  const [access, setAccess] = useState(false);
  const [role, setRole] = useState<string>('user');
  const [redirectTo, setRedirectTo] = useState<string | undefined>(undefined);

  const [searchParams] = useSearchParams();
  const actionData = useActionData() as ActionData;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }

    if (actionData?.access?.granted) {
      setAccess(true);
    }
  }, [actionData]);

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

          <Form method="post">
            <input type="hidden" name="access" value="false" />

            <Label caption="Voer je access code in">
              <Input
                name="access-code"
                type="text"
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
      <Form method="post" className="space-y-6" noValidate>
        <input type="hidden" name="role" value={role} />
        <input type="hidden" name="access" value="true" />

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              ref={emailRef}
              id="email"
              required
              autoFocus={true}
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="email-error"
              className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            />
            {actionData?.errors?.email && (
              <div className="pt-1 text-red-700" id="email-error">
                {actionData.errors.email}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              ref={passwordRef}
              name="password"
              type="password"
              autoComplete="new-password"
              aria-invalid={actionData?.errors?.password ? true : undefined}
              aria-describedby="password-error"
              className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            />
            {actionData?.errors?.password && (
              <div className="pt-1 text-red-700" id="password-error">
                {actionData.errors.password}
              </div>
            )}
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Button type="submit" primary>
          Create Account
        </Button>
        <div className="flex items-center justify-center">
          <div className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              className="text-blue-500 underline"
              to={{
                pathname: '/login',
                search: searchParams.toString(),
              }}
            >
              Log in
            </Link>
          </div>
        </div>
      </Form>
    </AuthPageLayout>
  );
}
