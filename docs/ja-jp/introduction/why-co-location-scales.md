# コロケーションがスケールする理由

コロケーションは DX の話として説明しやすいですが、本質は実プロダクトの保守コストを下げることにあります。

## コアメッセージ

メッセージが、それを定義するコンポーネントや route の近くにあると、別ディレクトリの翻訳ファイルを同期する手間が減り、レビュー対象の変更そのものに集中しやすくなります。

コードベースが大きくなるほど、この差が効いてきます。

## 大きなコードベースで良くなること

### refactor が局所化しやすい

コンポーネントを動かしたら、メッセージも一緒に動かせます。locale directory 側で二段階目の migration をする必要が減ります。

### dead message を見つけやすい

未使用メッセージが巨大な locale file に埋もれません。コンポーネントの近くにあるので、通常の code review で気付きやすくなります。

### review distance が短くなる

実装とユーザー向けの文言をまとめてレビューできます。レビュー担当者は UI と文言を同じ場所で確認できるため、UI 変更だけ見て文言変更を見落としたり、parameter mismatch を見逃したりしにくくなります。

### IDE navigation が日常導線に乗る

message reference から code jump できると、翻訳確認が検索ゲームではなく通常の開発体験に近づきます。

## 特に相性が良い場面

`i18n-at` が強くはまるのは次のようなケースです。

- product team が UI と文言をまとめて持つ
- Next.js App Router で route-local ownership と相性が良い
- refactor が頻繁に起きる
- message usage を compile time に検証したい
- AI 支援開発を前提にしていて、local context の近さが効く

## 向かない場面

コロケーションは万能ではありません。

次のような環境では、central locale file の方が適切なことがあります。

- 大規模な外部 localization team が主に翻訳を管理する
- TMS-first の運用が必須
- message が広く共有され、component ownership が弱い

## AI 支援開発で効く理由

AI 支援コーディングは、関連コンテキストが近いほど扱いやすくなります。

message と component が近いと:

- prompt に必要な repo 全体コンテキストが減る
- 生成差分をレビューしやすい
- UI と文言のズレが起きにくい

レビューが不要になるわけではありませんが、良いレビューを安くできます。

## 実践ルール

基本は component または route 境界で co-location し、共有が十分に安定して意味があるときだけ shared message module に切り出します。

これで default はシンプルに保ちつつ、必要な再利用だけを意図的に作れます。
