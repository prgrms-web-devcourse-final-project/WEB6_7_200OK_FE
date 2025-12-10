export function isValue(value: number | string | readonly string[] | undefined) {
  if (value === undefined) return false;
  if (typeof value === "number") return true;
  if (typeof value === "string" || Array.isArray(value)) return value.length > 0;
  return false;
}
