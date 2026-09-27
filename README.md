---
title: README
tags: [setup]
---

# obsidian-template

PARA ベースの Obsidian Vault テンプレート。**フォルダ骨格・テンプレート・Obsidian の設定一式だけ**が入っていて、ノートの中身は入っていない。クローンして Obsidian で開けば、そのまま書き始められる状態になる。

- PARA（Projects / Areas / Resources / Archive）＋ INBOX のフォルダ構成
- Templater によるフォルダ別テンプレートの自動適用
- Dataview ダッシュボード（[[Welcome]]）
- Periodic Notes / Full Calendar / Excalidraw の保存先をフォルダ構成に合わせて設定済み
- `Ctrl+Alt+N` で日付名の Canvas / Base を `00_INBOX` に作る QuickAdd マクロ

詳細は [[CONVENTIONS]]（運用ルール）と [[PLUGINS]]（プラグイン設定）にある。

---

## セットアップ

### 1. Vault として開く

このフォルダをコピー（またはクローン）して、Obsidian の「フォルダを Vault として開く」で開く。

### 2. コミュニティプラグインを入れる

**このテンプレートにプラグイン本体は入っていない**（設定だけ）。設定 → コミュニティプラグイン → 制限モードを OFF にしてから、[[PLUGINS]] の一覧にあるプラグインをストアから入れる。

インストールすると各プラグインのフォルダに本体が展開され、**既に置いてある `data.json` がそのまま設定として読み込まれる**ので、設定画面を触り直す必要はない。

最低限これだけ入れれば構成は動く:

| プラグイン | 無いと困ること |
|---|---|
| Dataview | [[Welcome]] のダッシュボードが表示されない |
| Templater | フォルダ別のテンプレート自動適用が効かない |
| QuickAdd | `Ctrl+Alt+N` の Canvas / Base 作成が効かない |
| Periodic Notes | デイリーノートが `40_Journal` に作られない |
| Homepage | 起動時に [[Welcome]] が開かない |

### 3. テーマ（任意）

`appearance.json` は Minimal テーマ（by @kepano）を指している。設定 → 外観 → テーマを管理 から Minimal を入れると、`obsidian-minimal-settings` の設定値（行幅 80・最大幅 88% ・文字サイズなど）がそのまま効く。1920x1080 の画面で本文が約 1280px になる幅にしてある（詳細は [[PLUGINS]] の「表示領域の横幅」）。入れない場合は既定テーマで動く（エラーにはならない）。

CSS スニペットを 2 本有効にしてあり、Minimal を入れていなくても効く。`readable-width.css` は本文の最大幅を約 1280px に、`mermaid-fit.css` は Mermaid の図を本文の幅に収める。

### 4. バージョン管理（任意）

Vault を Git で管理するなら、初期化は各自で行う:

```sh
git init
git add -A
git commit -m "chore: init vault from obsidian-template"
git remote add origin <your-repo>
```

---

## フォルダ構成

| フォルダ | 用途 |
|----------|------|
| `00_INBOX` | すべての新規メモの一時保管場所 |
| `10_Projects` | 期限と明確なゴールがある「終わりがある」活動 |
| `20_Areas` | 期限のない継続的な責任領域 |
| `30_Resources` | 将来役立つ可能性のあるトピックや資料 |
| `40_Journal` | デイリーノート（`Events/` は Full Calendar の予定） |
| `90_Templates` | テンプレート（`scripts/` は QuickAdd 用スクリプト） |
| `98_Assets` | 画像・PDF などの添付（`Excalidraw/` は作図） |
| `99_Archive` | 完了プロジェクト／関心がなくなったリソース |
| `docs/` | このテンプレート自体の説明。不要なら消してよい |

フォルダ名は半角英数字。番号プレフィックスでサイドバーの並び順を固定している。運用の考え方は [[CONVENTIONS]] を参照。

---

## テンプレート

| ファイル | 自動適用される作成先 |
|---|---|
| `90_Templates/Note.md` | `00_INBOX` |
| `90_Templates/Project.md` | `10_Projects` |
| `90_Templates/Daily.md` | `40_Journal` |
| `90_Templates/Event.md` | （自動適用なし。手書きで予定を作るとき用） |

適用除外: `40_Journal/Events` / `90_Templates` / `98_Assets`

---

## `Ctrl+Alt+N` — 日付名の Canvas / Base

Obsidian には Canvas の作成先やファイル名を指定する設定が無く、**Canvas は `newFileLocation` を無視して Vault 直下に作られる**。`90_Templates/scripts/new-dated-file.js` がこれを埋めていて、`00_INBOX/YYYY-MM-DD.canvas`（または `.base`）を作って開く。同日 2 つ目以降は `-2`, `-3` と採番。

QuickAdd のマクロとホットキーは `quickadd/data.json` と `hotkeys.json` に入っているので、QuickAdd を入れれば復元される。手で作り直す場合は [[PLUGINS]] の QuickAdd の項を参照。

---

## テンプレートに入っていないもの

| 対象 | 理由 |
|---|---|
| ノート本体 | テンプレートなので中身は空 |
| プラグイン／テーマ本体（`main.js` など） | 22MB あり、バージョンが固定されてしまう。ストアから入れる |
| `workspace.json` | ペイン配置は端末ごとの状態 |
| `mermaid-tools` の `data.json` | プラグイン既定のスニペット集（36KB）で、インストール時に生成される |
