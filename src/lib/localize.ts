export type Lang = "zh" | "en";

type Localized<T> = T extends { zh: string; en: string }
  ? string
  : T extends readonly (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

// 把资料里所有 { zh, en } 字段换成对应语言的字符串
export function localize<T>(value: T, lang: Lang): Localized<T> {
  if (Array.isArray(value)) {
    return value.map((v) => localize(v, lang)) as Localized<T>;
  }
  if (value && typeof value === "object") {
    if ("zh" in value && "en" in value) {
      return (value as Record<Lang, string>)[lang] as Localized<T>;
    }
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, localize(v, lang)]),
    ) as Localized<T>;
  }
  return value as Localized<T>;
}
