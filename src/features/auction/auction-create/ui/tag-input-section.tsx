import { useState, useCallback } from "react";

import { X } from "lucide-react";

import { MAX_TAGS, addTagValidation, validateTagInput } from "@/entities/auction";
import Button from "@/shared/ui/button/button";
import Input from "@/shared/ui/input/input";

interface TagInputSectionProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TagInputSection({ tags, onTagsChange }: TagInputSectionProps) {
  const [tagInput, setTagInput] = useState<string>("");

  const handleTagInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const value = validateTagInput(inputValue);
    setTagInput(value);
  }, []);

  const handleTagInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.nativeEvent.isComposing) {
        return;
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();

        if (addTagValidation(tags, tagInput)) {
          onTagsChange([...tags, tagInput.trim()]);
          setTagInput("");
        }
      }
    },
    [tags, tagInput, onTagsChange]
  );

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      onTagsChange(tags.filter((tag) => tag !== tagToRemove));
    },
    [tags, onTagsChange]
  );

  return (
    <div>
      <label htmlFor="tags" className="mb-2 block text-sm font-medium">
        태그 ({tags.length}/{MAX_TAGS})
      </label>
      <Input
        id="tags"
        type="text"
        placeholder={tags.length <= MAX_TAGS ? "태그를 입력해주세요." : undefined}
        value={tagInput}
        onChange={handleTagInputChange}
        onKeyDown={handleTagInputKeyDown}
        disabled={tags.length >= MAX_TAGS}
        className={tags.length >= MAX_TAGS ? "select-none" : ""}
        maxLength={10}
      />
      {tags.length > 0 && (
        <div className="mt-2 flex min-h-10 w-full flex-wrap items-center gap-2 rounded-lg bg-transparent py-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-accent text-accent-foreground flex items-center gap-1 rounded-lg px-2 py-1 text-sm"
            >
              # {tag}
              <Button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                variant="ghost"
                size="icon-sm"
                className="h-auto w-auto p-0 hover:bg-transparent hover:opacity-70"
                aria-label={`${tag} 태그 삭제`}
              >
                <X className="size-3" />
              </Button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
