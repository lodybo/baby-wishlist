import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Props as InputProps } from '~/components/Inputs/Props';
import TextInput from '~/components/Inputs/TextInput';
import Tag from '~/components/Tag';
import Button from '~/components/Button';

type Props = InputProps & {

};

export default function TagField({ name }: Props) {
  const [ tags, setTags ] = useState<string[]>([]);
  const [ newTag, setNewTag ] = useState('');

  const handleNewTag = () => {
    setTags([ ...tags, newTag ]);
    setNewTag('');
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNewTag();
    }
  };

  const handleTagDeletion = (tag: string) => {
    const index = tags.indexOf(tag);

    if (index > -1) {
      const updatedTags = [...tags];
      updatedTags.splice(index, 1);

      setTags(updatedTags);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={tags} />

      <div className="flex flex-row gap-2.5">
        <TextInput
          className="flex-1"
          value={newTag}
          onChange={(evt) => { setNewTag(evt.target.value) }}
          onKeyDown={(e) => { handleEnterKey(e); }}
        />

        <Button primary onClick={() => { handleNewTag(); }}>
          Tag toevoegen
        </Button>
      </div>

      <ul className="flex flex-row flex-wrap gap-2.5">
        {
          tags.map(tag => (
            <Tag key={tag} tag={tag} isEditable onDelete={tag => handleTagDeletion(tag)} />
          ))
        }
      </ul>
    </div>
  );
}
