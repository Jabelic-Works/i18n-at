# Message Format Syntax

<div v-pre>

## Variable Placeholders

To include dynamic values, use `{$variableName}` syntax:

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

### Brace Escaping

When you need to display actual brace characters in your output, double the braces:

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
