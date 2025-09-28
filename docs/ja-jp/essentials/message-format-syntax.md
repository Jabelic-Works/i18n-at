# メッセージフォーマット構文

<div v-pre>

## 変数プレースホルダー

動的な値を含めるには `{$variableName}` 構文を使用します：

```typescript
const { messages } = defineMessages({
  en: {
    welcome: "Welcome, {$name}!",
    notification: "You have {$count} new messages",
  },
  ja: {
    welcome: "{$name}さん、ようこそ！",
    notification: "新しいメッセージが{$count}件あります",
  },
});
```

### ブレースのエスケープ

実際のブレース文字を出力に表示する必要がある場合は、ブレースを二重にします：

```typescript
const { messages } = defineMessages({
  en: {
    syntaxHelp: "Use {{$variable}} for interpolation",
    jsObject: "const obj = {{ key: value }};",
    cssRule: "body {{ margin: 0; }}",
  },
  ja: {
    syntaxHelp: "補間には{{$variable}}を使用してください",
    jsObject: "const obj = {{ key: value }};",
    cssRule: "body {{ margin: 0; }}",
  },
});
```

</div>
