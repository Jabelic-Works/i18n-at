// messages.ts
import { defineMessages } from "i18n-at";

export const { messages } = defineMessages({
  en: {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome, {name}!",
    },
    navigation: {
      home: "Home",
      about: "About",
      contact: "Contact",
    },
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
    },
  },
  ja: {
    dashboard: {
      title: "ダッシュボード",
      welcome: "{name} さん、ようこそ！",
    },
    navigation: {
      home: "ホーム",
      about: "詳細",
      contact: "お問い合わせ",
    },
    common: {
      loading: "読み込み中...",
      save: "保存",
      cancel: "キャンセル",
    },
  },
  zh: {
    dashboard: {
      title: "仪表板",
      welcome: "欢迎，{name}！",
    },
    navigation: {
      home: "首页",
      about: "关于",
      contact: "联系我们",
    },
    common: {
      loading: "加载中...",
      save: "保存",
      cancel: "取消",
    },
  },
});

// Configuration for locale extraction
export const i18nConfig = {
  locales: ["en", "ja", "zh"],
  defaultLocale: "en",
} as const;

export type AppLocale = keyof typeof messages;
