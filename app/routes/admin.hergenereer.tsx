import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { regenerateImages } from '~/models/images.server';
import { requireAdmin } from '~/session.server';
import { getErrorMessage } from '~/utils';

export async function loader({ request }: LoaderArgs) {
  await requireAdmin(request);

  try {
    await regenerateImages();
    return redirect('/admin');
  } catch (err) {
    const message = getErrorMessage(err);
    throw json({ error: message }, { status: 500 });
  }
}
