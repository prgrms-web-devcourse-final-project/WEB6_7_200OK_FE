import { RadioGroup, RadioGroupItem } from "@/shared/ui";

export default function FilterRadioGroup<K extends string>({
  name,
  defaultValue,
  options,
  getLabel,
}: {
  name: string;
  defaultValue: K;
  options: readonly K[];
  getLabel: (key: K) => string;
}) {
  return (
    <RadioGroup defaultValue={defaultValue} className="gap-4">
      {options.map((key) => {
        const id = `${name}-${key}`;

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
