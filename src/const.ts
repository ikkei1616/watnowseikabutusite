// 現在の年~2012までの配列
export const YEARS_OPTIONS = Array.from(
  { length: new Date().getFullYear() - 2011 },
  (_, i) => new Date().getFullYear() - i
);
