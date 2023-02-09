import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import invariant from 'tiny-invariant';
import Button from '~/components/Button';
import ErrorText from '~/components/ErrorText';
import Fieldset from '~/components/Fieldset';
import EmailInput from '~/components/EmailInput';
import PasswordInput from '~/components/PasswordInput';
import TextInput from '~/components/TextInput';
import Label from '~/components/Label';
import Notice from '~/components/Notice';
import { editUser, editUserPassword, verifyLogin } from '~/models/user.server';
import { getUser, requireUser } from '~/session.server';
import {
  validateEmail,
  validateName,
  validateNewPassword,
  validatePassword,
  validateVerifiedNewPassword,
} from '~/validations';

interface Payload {
  data: {
    errors?: {
      name?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
      verifyNewPassword?: string;
    };
    success?: {
      personalDetails?: boolean;
      credentials?: boolean;
    };
    fields?: {
      name?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
      verifyNewPassword?: string;
    };
  };
  status: number;
}

export const loader = async ({ request }: LoaderArgs) => {
  await requireUser(request);

  const user = await getUser(request);
  invariant(user, 'Gebruiker is niet gevonden.');

  return json({ user });
};

export const action = async ({ request }: ActionArgs) => {
  const { id: userId, email: userEmail } = await requireUser(request);

  const {
    settingsGroup,
    name,
    email,
    currentPassword,
    newPassword,
    verifyNewPassword,
  } = Object.fromEntries(await request.formData());

  const payload: Payload = {
    data: {},
    status: 200,
  };

  if (settingsGroup === 'personalDetails') {
    payload.data.errors = {
      name: validateName(name),
      email: validateEmail(email),
    };

    if (Object.values(payload.data.errors).some(Boolean)) {
      payload.status = 400;
    } else {
      invariant(typeof name === 'string', 'Name is of an incorrect type');
      invariant(typeof email === 'string', 'Email is of an incorrect type');

      const fields = { name, email };

      await editUser({
        id: userId,
        name,
        email,
      });

      payload.data.fields = fields;
      payload.data.success = {
        personalDetails: true,
      };
    }
  } else {
    payload.data.errors = {
      currentPassword: validatePassword(currentPassword),
      newPassword: validateNewPassword(currentPassword, newPassword),
      verifyNewPassword: validateVerifiedNewPassword(
        newPassword,
        verifyNewPassword,
      ),
    };

    invariant(
      typeof currentPassword === 'string',
      'Current password is of an incorrect type',
    );
    invariant(
      typeof newPassword === 'string',
      'New password is of an incorrect type',
    );
    invariant(
      typeof verifyNewPassword === 'string',
      'Verified new password is of an incorrect type',
    );

    if (Object.values(payload.data.errors).some(Boolean)) {
      payload.status = 400;
      payload.data.fields = { currentPassword, newPassword, verifyNewPassword };
    } else {
      const user = await verifyLogin(userEmail, currentPassword);

      if (!user) {
        payload.data.errors.currentPassword =
          'Het huidige wachtwoord is ongeldig';
        payload.status = 400;
      } else {
        await editUserPassword({
          id: userId,
          newPassword,
        });

        payload.data.success = {
          credentials: true,
        };
      }
    }
  }

  return json(payload.data, { status: payload.status });
};

export default function ProfileSettingsPage() {
  const [showNotice, setShowNotice] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState('');
  const { user } = useLoaderData<typeof loader>();
  const payload = useActionData<typeof action>();

  const handleNoticeClose = () => {
    setShowNotice(false);
  };

  useEffect(() => {
    if (payload?.success?.personalDetails) {
      setNoticeMessage('Persoonlijke gegevens zijn bijgewerkt');
      setShowNotice(true);
    }

    if (payload?.success?.credentials) {
      setNoticeMessage('Wachtwoord is bijgewerkt');
      setShowNotice(true);
    }
  }, [payload]);

  return (
    <div className="mb-20 space-y-10">
      <h1 className="text-2xl lg:text-4xl">Instellingen</h1>

      <Notice
        visible={showNotice}
        message={noticeMessage}
        state="success"
        closeHandler={handleNoticeClose}
      />

      <Fieldset caption="Persoonlijke gegevens">
        <Form method="post" className="flex flex-col gap-7" noValidate>
          <input type="hidden" name="settingsGroup" value="personalDetails" />

          <Label caption="Wat is je naam?">
            <TextInput
              name="name"
              autoComplete="given-name"
              defaultValue={user.name}
              aria-invalid={payload?.errors?.name ? true : undefined}
              aria-describedby="name-error"
            />
            {payload?.errors?.name && (
              <ErrorText id="name-error">{payload.errors.name}</ErrorText>
            )}
          </Label>

          <Label caption="Je e-mailadres">
            <EmailInput
              name="email"
              autoComplete="email"
              defaultValue={user.email}
              aria-invalid={payload?.errors?.email ? true : undefined}
              aria-describedby="email-error"
            />
            {payload?.errors?.email && (
              <ErrorText id="email-error">{payload.errors.email}</ErrorText>
            )}
          </Label>

          <div className="flex justify-end">
            <Button type="submit" primary>
              Wijzigen
            </Button>
          </div>
        </Form>
      </Fieldset>

      <Fieldset caption="Wachtwoord wijzigen">
        <Form
          method="post"
          className="flex flex-col gap-7"
          noValidate
          reloadDocument
        >
          <input type="hidden" name="settingsGroup" value="credentials" />

          <Label caption="Wat is je huidige wachtwoord?">
            <PasswordInput
              name="currentPassword"
              autoComplete="current-password"
              defaultValue={payload?.fields?.currentPassword || ''}
              aria-invalid={payload?.errors?.currentPassword ? true : undefined}
              aria-describedby="current-password-error"
            />
            {payload?.errors?.currentPassword && (
              <ErrorText id="current-password-error">
                {payload.errors.currentPassword}
              </ErrorText>
            )}
          </Label>

          <div className="flex flex-col space-x-0 space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
            <Label className="flex-1" caption="Wat is je nieuwe wachtwoord?">
              <PasswordInput
                name="newPassword"
                autoComplete="new-password"
                defaultValue={payload?.fields?.newPassword || undefined}
                aria-invalid={payload?.errors?.newPassword ? true : undefined}
                aria-describedby="new-password-error"
              />
              {payload?.errors?.newPassword && (
                <ErrorText id="new-password-error">
                  {payload.errors.newPassword}
                </ErrorText>
              )}
            </Label>

            <Label
              className="flex-1"
              caption="Voer nogmaals het nieuwe wachtwoord in"
            >
              <PasswordInput
                name="verifyNewPassword"
                autoComplete="new-password"
                defaultValue={payload?.fields?.verifyNewPassword || undefined}
                aria-invalid={
                  payload?.errors?.verifyNewPassword ? true : undefined
                }
                aria-describedby="verify-password-error"
              />
              {payload?.errors?.verifyNewPassword && (
                <ErrorText id="verify-password-error">
                  {payload.errors.verifyNewPassword}
                </ErrorText>
              )}
            </Label>
          </div>

          <div className="flex justify-end">
            <Button type="submit" danger>
              Wachtwoord veranderen
            </Button>
          </div>
        </Form>
      </Fieldset>
    </div>
  );
}
