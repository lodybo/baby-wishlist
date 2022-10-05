import { useEffect, useState } from 'react';

export type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
};

export default function ToggleButton({
  options,
  name,
  value,
  onChange,
}: Props) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    } else {
      setSelectedValue(options[0].value);
    }
  }, [value, options]);

  const handleChecked = (value: string) => {
    onChange(value);
    setSelectedValue(value);
  };

  return (
    <div className="flex flex-row gap-2.5">
      {options.map(({ label, value }) => (
        <label key={value}>
          <input
            className="peer hidden"
            type="radio"
            name={`${name}-toggle`}
            value={value}
            onChange={() => handleChecked(value)}
            defaultChecked={selectedValue === value}
            form=""
          />
          <span
            className="
              block
              cursor-pointer
              rounded
              bg-slate-200
              py-2
              px-4
              transition
              hover:bg-cyan-100
              peer-checked:bg-cyan-200
            "
          >
            {label}
          </span>
        </label>
      ))}
    </div>
  );
}
