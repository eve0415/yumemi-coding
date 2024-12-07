# フロントエンドコーディング試験

## 要件

<https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d>

### ワイヤーフレーム

<https://yumemi.notion.site/ab4a837f8e764dffb0fc93c7b1387af7>

## デプロイ先

Vercel: <https://yumemi-coding-ashen.vercel.app>

## 使用技術

- Node.js v22 (LTS)
- Next.js (React v19)
- TypeScript
- Tailwind CSS

### フォーマッター・Linter

- Biome
- ESlint

### テスト

- Vitest
- Playwright
- React Testing Library

## 開発方法

1. リポジトリをクローン

```zsh
git clone https://github.com/eve0415/yumemi-coding.git
```

2. DevContainer を起動

> [!NOTE]
> 推奨している拡張機能、設定や依存ライブラリなどは自動的にインストールされます。

3. `.env.local` ファイルを `.env.example` を参考に作成
4. 開発サーバーを起動
  
  ```zsh
  pnpm dev
  ```
  
## テスト方法

```zsh
pnpm test
```

### テストバージョン

全てのライブラリは開発時点での最新バージョンを使用しています（一部は最新どころか、canary バージョンを使用しています）。
[Playwright がサポートしているブラウザバージョンでテストしています。](https://playwright.dev/docs/release-notes#browser-versions)

## 参考資料など

- [Next.js](https://nextjs.org/)
- [Tailwind CSS v4.0 Beta](https://tailwindcss.com/docs/v4-beta)
- [GitHub: tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [React v19 Blog](https://react.dev/blog/2024/12/05/react-19)
- [Recharts](https://recharts.org/en-US/)
- [GitHub: recharts/recharts](https://github.com/recharts/recharts)
- [Vitest](https://vitest.dev/guide/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/docs/intro/)
- [Biome](https://biomejs.dev/)
- [Vercel](https://vercel.com/)
- [How can I run end-to-end tests after my Vercel Preview Deployment?](https://vercel.com/guides/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment)
- [Can I use?](https://caniuse.com/)
