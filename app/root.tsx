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
import {
  faCircle,
  faCircleCheck,
  faCircleXmark,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import type {
  HtmlMetaDescriptor,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import Document from '~/components/Document';
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
  faCircleXmark,
  faSquare,
  faSquareCheck,
);

// @ts-ignore
export const links: LinksFunction = () => {
  return [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Bentham&display=swap',
      rel: 'stylesheet',
    },
    {
      rel: 'stylesheet',
      href: tailwindStylesheetUrl,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png?v1=1',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png?v1=1',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png?v1=1',
    },
    { rel: 'manifest', href: '/site.webmanifest?v1=1' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg?v1=1', color: '#f1f5f9' },
    { rel: 'shortcut icon', href: '/favicon.ico?v1=1' },
  ];
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const metaCollection: HtmlMetaDescriptor = {
    charset: 'utf-8',
    title: 'Akés wensjes',
    viewport: 'width=device-width,initial-scale=1',
    'msapplication-TileColor': '#46867e',
    'theme-color': '#46867e',
  };

  if (data.isStaging && data.isStaging === 'true') {
    metaCollection.robots = 'noindex, nofollow, noarchive, nosnippet, nocache';
  }

  return metaCollection;
};

export const loader = async ({ request }: LoaderArgs) => {
  return json({
    user: await getUser(request),
    isStaging: process.env.IS_STAGING,
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
      <div className="prose lg:prose-xl xl:prose-2xl">
        <h1>Er is iets fout gegaan.</h1>
        <p>{error.message}</p>
      </div>
    </Document>
  );
}
