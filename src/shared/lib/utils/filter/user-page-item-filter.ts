export function filterItemsByStatus<T extends { status: string }>(
  items: T[],
  filterStatus: string,
  allLabel = "전체"
): T[] {
  if (filterStatus === allLabel) return items;
  return items.filter((item) => item.status === filterStatus);
}

export function generateFilterOptions(statuses: string[], allLabel = "전체"): string[] {
  const sortedStatuses = [...statuses].sort((a, b) => a.localeCompare(b));
  return [allLabel, ...sortedStatuses];
}

export function sortItemsByDateAndName<T extends { date: string; name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (dateA !== dateB) {
      return dateB - dateA;
    }

    return a.name.localeCompare(b.name);
  });
}
