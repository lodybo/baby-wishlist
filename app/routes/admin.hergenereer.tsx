import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Notice from '~/components/Notice';
import type { Props as NoticeProps } from '~/components/Notice';

export default function RegenerateImagesPage() {
  const fetcher = useFetcher();
  const [showNotice, setShowNotice] = useState(false);
  const [noticeState, setNoticeState] = useState<NoticeProps['state']>();
  const [noticeMessage, setNoticeMessage] = useState<string>('');

  useEffect(() => {
    if (fetcher.type === 'done') {
      const data = JSON.parse(fetcher.data);

      if (data.success) {
        setNoticeState('success');
        setNoticeMessage('Afbeeldingen zijn opnieuw gegenereerd');
      } else {
        setNoticeState('error');
        setNoticeMessage(`Er is iets fout gegaan: ${data.message}`);
      }

      setShowNotice(true);
    }
  }, [fetcher]);

  const pending = fetcher.state === 'submitting';

  const closeHandler = () => {
    setShowNotice(false);
  };

  return (
    <div className="prose">
      <h1>Hergenereer afbeeldingen</h1>
      <p>
        Zijn er nieuwe afbeeldingsformaten bekend? Dan moeten we alle
        afbeeldingen doorgaan en ze opnieuw genereren in de nieuwe formaten.
      </p>
      <p>Dat kan je doen door op onderstaande knop te drukken.</p>

      <fetcher.Form
        className="mb-5"
        action="/api/images/regenerate"
        method="post"
      >
        <Button type="submit" danger pending={pending} disabled={pending}>
          Hergenereer afbeeldingen
        </Button>
      </fetcher.Form>

      <Notice
        visible={fetcher.data && showNotice}
        message={noticeMessage}
        state={noticeState}
        closeHandler={closeHandler}
      />
    </div>
  );
}
