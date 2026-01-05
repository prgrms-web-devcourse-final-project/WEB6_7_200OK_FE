import { useId } from "react";

import { RadioGroup, RadioGroupItem } from "@/shared/ui";

export function FilterRadioGroup<K extends string>({
  name,
  value,
  options,
  getLabel,
  onChange,
}: {
  name: string;
  value: K;
  options: readonly K[];
  getLabel: (key: K) => string;
  onChange?: (value: K) => void;
}) {
  const itemId = useId();

  return (
    <RadioGroup
      value={value}
      onValueChange={(newValue) => onChange?.(newValue as K)}
      className="gap-4"
    >
      {options.map((key) => {
        const id = `${itemId}-${name}-${key}`;

        return (
          <div key={key} className="flex items-center gap-2">
            <RadioGroupItem value={key} id={id} />
            <label htmlFor={id} className="cursor-pointer text-sm">
              {getLabel(key)}
            </label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
