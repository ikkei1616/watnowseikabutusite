// 現在の年~2012までの配列
export const YEARS_OPTIONS = Array.from(
  { length: new Date().getFullYear() - 2011 },
  (_, i) => new Date().getFullYear() - i
);

export const GITHUB_URL = "https://github.com/";
export const X_URL = "https://x.com/";
export const INSTAGRAM_URL = "https://www.instagram.com/";