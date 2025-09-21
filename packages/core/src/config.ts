// i18n設定を定義するライブラリ関数

export type InterpolationFormat = "none" | "intl" | "legacy" | "double";
export const DEFAULT_INTERPOLATION_FORMAT: InterpolationFormat = "legacy";

export interface LocaleConfig {
  name: string; // 表示名
  direction?: "ltr" | "rtl"; // 文字方向
  dateFormat?: string; // 日付フォーマット
}

export interface I18nConfig<TLocales extends Record<string, LocaleConfig>> {
  locales: TLocales;
  defaultLocale: keyof TLocales;
  fallbackLocale?: keyof TLocales;
  interpolationFormat?: InterpolationFormat; // 'none' = no interpolation, 'intl' = {$name}, 'legacy' = {name}, 'double' = {{name}}
}

// i18n設定を定義する関数（ライブラリのエントリーポイント）
export function defineI18nConfig<const T extends Record<string, LocaleConfig>>(
  config: I18nConfig<T>
) {
  return {
    ...config,
    // デフォルト値を設定
    interpolationFormat:
      config.interpolationFormat ?? DEFAULT_INTERPOLATION_FORMAT,
    // 型から自動生成される型とヘルパー
    localeKeys: Object.keys(config.locales) as Array<keyof T>,
    isValidLocale: (locale: unknown): locale is keyof T =>
      typeof locale === "string" && locale in config.locales,
    getLocaleConfig: (locale: keyof T) => config.locales[locale],
  } as const;
}

// 型ヘルパー: 設定から Locale Union 型を抽出
export type ExtractLocales<T> = T extends I18nConfig<infer U> ? keyof U : never;

// 型ヘルパー: 設定からデフォルトLocaleを抽出
export type ExtractDefaultLocale<T> = T extends I18nConfig<infer U>
  ? T["defaultLocale"]
  : never;

// 型ヘルパー: defineI18nConfig の戻り値から Locale Union 型を抽出
export type ExtractConfigLocales<T> = T extends ReturnType<
  typeof defineI18nConfig<infer U extends Record<string, LocaleConfig>>
>
  ? keyof U
  : never;
