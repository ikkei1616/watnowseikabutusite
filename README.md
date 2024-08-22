## 実行方法

下記コマンドを実行すると、[http://localhost:3000](http://localhost:3000)に画面が表示される。

```bash
npm run dev
```

もし、cloneしたてや、新しいライブラリを入れたてで、「〇〇が足りてないです」みたいなエラーが起きていれば、下記コマンドを実行してから再度 `npm run dev` する

```bash
npm install
```


## ブランチの切り方

各々のブランチは下記命名ルールに従って最新の `develop` ブランチから切るようにする

- 新規機能
  - feature/機能名
- バグの修正
  - bugfix/機能名

機能名は、ケバブケース（kebab-case）で表記する。

例）〇〇〇-〇〇〇-〇〇

[命名規則のケース一覧](https://www.bioerrorlog.work/entry/naming-cases-list)


## 参考サイト

- HTML
  - [mdn_web_docs/HTML](https://developer.mozilla.org/ja/docs/Web/HTML/)
- CSS
  - [mdn_web_docs/CSS](https://developer.mozilla.org/ja/docs/Web/CSS)
- JavaScript
  - [mdn_web_docs/JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript)
- React
  - [React公式サイト](https://ja.react.dev/blog/2023/03/16/introducing-react-dev)
- Next.js
  - [Next.js公式サイト](https://nextjs.org/docs)
