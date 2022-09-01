import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeftLong,
  faEllipsisVertical,
  faEuroSign,
  faPencil,
  faRemove,
  faRobot,
  faSpinner,
  faTrashCan,
  faUser,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import Document from '~/components/Document';
import PageLayout from '~/layouts/Page';
import { getUser } from './session.server';

import tailwindStylesheetUrl from './styles/tailwind.css';

library.add(
  faRobot,
  faEllipsisVertical,
  faSpinner,
  faTrashCan,
  faPencil,
  faArrowLeftLong,
  faEuroSign,
  faRemove,
  faUser,
  faEye,
  faCircle,
  faCircleCheck,
);

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: "Cody's wensjes",
  viewport: 'width=device-width,initial-scale=1',
});

export const loader = async ({ request }: LoaderArgs) => {
  return json({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error.stack);

  return (
    <Document>
      <PageLayout>
        <div className="prose lg:prose-xl xl:prose-2xl">
          <h1>Er is iets fout gegaan.</h1>
          <p>{error.message}</p>
        </div>
      </PageLayout>
    </Document>
  );
}
