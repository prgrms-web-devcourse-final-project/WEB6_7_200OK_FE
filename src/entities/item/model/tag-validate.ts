export const MAX_TAGS = 5;

export const validateTagInput = (input: string): string =>
  input.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/g, "");

export const addTagValidation = (tags: string[], tagInput: string): boolean => {
  const trimmedValue = tagInput.trim();
  return tags.length < MAX_TAGS && trimmedValue !== "" && !tags.includes(trimmedValue);
};
