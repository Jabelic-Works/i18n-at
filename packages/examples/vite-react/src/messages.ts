import { defineMessages } from "i18n-at";

export const { messages } = defineMessages({
  "en-US": {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome, {name}!",
    },
    navigation: {
      brand: "i18n-at Example",
      home: "Home",
      about: "About",
      contact: "Contact",
      language: "Language:",
    },
    features: {
      colocation: {
        title: "Co-location Demo",
        description: "Messages stay close to the UI for easy maintenance.",
      },
      typeSafety: {
        title: "Type Safety",
        description: "TypeScript types and IDE code jumping help with refactoring.",
      },
      react: {
        title: "React Ready",
        description: "Use the same messages in Next.js App Router and Vite + React.",
      },
    },
    example: {
      heading: "Interactive Example",
      component: "React Component",
      currentLocale: "Current Locale:",
      hint: "This component uses useI18n() and useLocale(). Use the language selector above to switch languages.",
    },
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
    },
  },
  "ja-JP": {
    dashboard: {
      title: "ダッシュボード",
      welcome: "{name} さん、ようこそ！",
    },
    navigation: {
      brand: "i18n-at サンプル",
      home: "ホーム",
      about: "詳細",
      contact: "お問い合わせ",
      language: "言語:",
    },
    features: {
      colocation: {
        title: "近接配置のデモ",
        description: "メッセージを UI の近くに置くことで、保守しやすくなります。",
      },
      typeSafety: {
        title: "型安全",
        description: "TypeScript の型と IDE の定義ジャンプがリファクタリングを助けます。",
      },
      react: {
        title: "React に対応",
        description: "Next.js App Router と Vite + React で同じメッセージを使えます。",
      },
    },
    example: {
      heading: "操作できるサンプル",
      component: "React コンポーネント",
      currentLocale: "現在の言語:",
      hint: "このコンポーネントは useI18n() と useLocale() を使います。上の言語選択で表示を切り替えられます。",
    },
    common: {
      loading: "読み込み中...",
      save: "保存",
      cancel: "キャンセル",
    },
  },
  "zh-CN": {
    dashboard: {
      title: "仪表板",
      welcome: "欢迎，{name}！",
    },
    navigation: {
      brand: "i18n-at 示例",
      home: "首页",
      about: "关于",
      contact: "联系我们",
      language: "语言:",
    },
    features: {
      colocation: {
        title: "就近定义示例",
        description: "将消息定义在 UI 附近，便于维护。",
      },
      typeSafety: {
        title: "类型安全",
        description: "TypeScript 类型和 IDE 跳转帮助重构。",
      },
      react: {
        title: "支持 React",
        description: "在 Next.js App Router 和 Vite + React 中使用相同的消息。",
      },
    },
    example: {
      heading: "交互示例",
      component: "React 组件",
      currentLocale: "当前语言:",
      hint: "此组件使用 useI18n() 和 useLocale()。使用上方的语言选项切换显示。",
    },
    common: {
      loading: "加载中...",
      save: "保存",
      cancel: "取消",
    },
  },
});

export type AppLocale = keyof typeof messages;

export function isAppLocale(locale: string): locale is AppLocale {
  return Object.prototype.hasOwnProperty.call(messages, locale);
}
