import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import ToggleButton from '~/components/ToggleButton';

type Props = {
  name: string;
  defaultValue?: string;
};

export default function EditorField({ name, defaultValue }: Props) {
  // 'editor' | 'preview'
  const [ viewMode, setViewMode ] = useState<string>('editor');
  const [ value, setValue ] = useState('');

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const toggleButtonOptions = [
    { label: 'Editor', value: 'editor' },
    { label: 'Voorbeeld', value: 'preview'},
  ];

  const handleToggle = (value: string) => {
    setViewMode(value);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <input type="hidden" name={name} value={value} />
      <ToggleButton name="description" options={toggleButtonOptions} value="editor" onChange={handleToggle} />
      { viewMode === 'editor' ? (
        <div className="flex flex-row gap-5">
          <textarea
            className="
              flex-none
              w-2/3
              bg-transparent
              border
              border-slate-200
              p-2
              h-72
              rounded
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring
              focus-visible:ring-primary
              focus-visible:ring-offset-2
              focus-visible:ring-offset-slate-50
            "
            defaultValue={value}
            onChange={(evt) => { setValue(evt.target.value); }}
          />
          <div className="flex-none w-1/3">
            <h2 className="text-lg mb-2">Markdown cheatsheet</h2>
            <p className="mb-2">Je kan <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noreferrer nofollow" className="border-b border-b-4 border-b-cyan-200">hier</a> meer cheats vinden.</p>

            <p className="mb-2"><small className="text-sm">De backticks (<code>`</code>) hoef je niet te kopiëren.</small></p>
            <ul className="prose list-disc list-inside">
              <li className="text-lg list-none">Headings:</li>
              <li>Heading 1: <code># Heading 1</code></li> (Hoef je technisch gezien niet te gebruiken, omdat de naam van het product al heading 1 is).
              <li>Heading 2: <code>## Heading 2</code></li>
              <li>Heading 3: <code>### Heading 3</code></li>
              <li>Heading 4: <code>#### Heading 4</code></li>
              <li>Heading 5: <code>##### Heading 5</code></li>
              <li>Heading 6: <code>###### Heading 6</code></li>

              <li className="text-lg list-none">Tekst opmaak:</li>
              <li><strong>Bold</strong>: <code>**Bold**</code></li>
              <li><em >Italic</em>: <code>*Italic*</code></li>
              <li><a href="https://www.google.com" target="_blank" rel="noreferrer nofollow">Link</a>: <code>[Link](https://www.google.com)</code></li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="prose" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(value))}} />
      )}
    </div>
  );
}
