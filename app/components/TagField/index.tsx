import { useEffect, useState } from 'react';
import type { Props as InputProps } from '~/components/Inputs/Props';
import TextInput from '~/components/Inputs/TextInput';
import Tag from '~/components/Tag';
import Button from '~/components/Button';

type Props = Omit<InputProps, 'defaultValue'> & {
  defaultValue?: string[];
};

export default function TagField({ name, defaultValue }: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (defaultValue && defaultValue.length) {
      setTags([...defaultValue]);
    }
  }, [defaultValue]);

  const handleNewTag = () => {
    if (newTag) {
      setTags([...tags, newTag]);
      setNewTag('');
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
          onChange={(evt) => {
            setNewTag(evt.target.value);
          }}
        />

        <Button primary onClick={handleNewTag}>
          Tag toevoegen
        </Button>
      </div>

      <ul className="flex flex-row flex-wrap gap-2.5">
        {tags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            isEditable
            onDelete={(tag) => handleTagDeletion(tag)}
          />
        ))}
      </ul>
    </div>
  );
}
