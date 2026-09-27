---
title: PLUGINS
tags: [setup]
---

# プラグイン一覧と設定の意図

このテンプレートには**設定（`.obsidian/plugins/*/data.json`）だけ**が入っていて、プラグイン本体は入っていない。ストアからインストールすると、既に置いてある `data.json` がそのまま読み込まれる。

バージョンは設定を書き出した時点の動作確認バージョン。新しいものが出ていればそれで構わない。

## コミュニティプラグイン（20 個）

| プラグイン | ID | 確認バージョン | 位置づけ |
|---|---|---|---|
| Dataview | `dataview` | 0.5.68 | **必須**（ダッシュボード） |
| Templater | `templater-obsidian` | 2.25.1 | **必須**（テンプレート自動適用） |
| QuickAdd | `quickadd` | 2.27.0 | **必須**（`Ctrl+Alt+N`） |
| Homepage | `homepage` | 4.5.0 | **必須**（起動時に Welcome） |
| Periodic Notes | `periodic-notes` | 0.0.17 | **必須**（デイリーノート） |
| Full Calendar | `obsidian-full-calendar` | 0.10.7 | 予定管理 |
| Tasks | `obsidian-tasks-plugin` | 8.4.0 | タスク管理 |
| Omnisearch | `omnisearch` | 1.31.0 | 全文検索 |
| Excalidraw | `obsidian-excalidraw-plugin` | 2.27.3 | 作図 |
| Advanced Tables | `table-editor-obsidian` | 0.23.2 | 表編集 |
| Linter | `obsidian-linter` | 1.33.0 | 整形（既定は無効） |
| Paste image rename | `obsidian-paste-image-rename` | 1.6.1 | 画像リネーム |
| Auto Card Link | `auto-card-link` | 1.2.3 | URL のカード化 |
| Mermaid Tools | `mermaid-tools` | 1.4.1 | Mermaid スニペット |
| Mind Map | `obsidian-mind-map` | 1.1.0 | 見出しのマインドマップ表示 |
| Kanban | `obsidian-kanban` | 2.0.51 | カンバン |
| Iconize | `obsidian-icon-folder` | 2.14.7 | フォルダアイコン |
| Commander | `cmdr` | 0.5.12 | コマンド配置 |
| Style Settings | `obsidian-style-settings` | 1.0.9 | テーマ微調整 |
| Minimal Theme Settings | `obsidian-minimal-settings` | 9.0.0 | Minimal 用設定 UI |

**「必須」以外は好みで外してよい。** 外す場合は `.obsidian/community-plugins.json` から ID を消し、`.obsidian/plugins/<id>/` フォルダごと削除する。

### 設定が入っているもの／入っていないもの

`data.json` を同梱しているのは次の 13 個 — Homepage / Templater / QuickAdd / Periodic Notes / Full Calendar / Tasks / Excalidraw / Omnisearch / Linter / Advanced Tables / Auto Card Link / Iconize / Minimal Theme Settings。

同梱していないもの（Dataview / Kanban / Mind Map / Style Settings / Commander / Paste image rename / Mermaid Tools）は**すべて既定値で動く**。Mermaid Tools の `data.json` はプラグイン既定のスニペット集 36KB なので、インストール時の自動生成に任せている。

## 構成に直結する設定

| プラグイン | 設定 | 値 |
|---|---|---|
| Templater | `templates_folder` / フォルダ別適用 | `90_Templates` / `00_INBOX`→Note, `10_Projects`→Project, `40_Journal`→Daily |
| Periodic Notes | 粒度 / `format` / `folder` / `templatePath` | 日次のみ / `YYYY-MM-DD` / `40_Journal` / **空**（Templater に一本化） |
| Full Calendar | ソース | local / `40_Journal/Events` |
| Excalidraw | 保存先 / ライブラリ / スクリプト / CJK フォント | すべて `98_Assets/Excalidraw` 配下 |
| Homepage | 対象 / `refreshDataview` | `Welcome` / `true`（開くたびに再計算） |
| QuickAdd | choice | `new-dated-file`（Macro、`Ctrl+Alt+N`） |

Excalidraw は `loadJapaneseFonts: true`。**フォント本体は初回作図時に自動ダウンロードされ `98_Assets/Excalidraw/CJK Fonts` に置かれる**ので、初回だけ少し待つ。OFF のままだと図中の日本語を PNG/SVG に書き出したとき字形が崩れることがある。

Auto Card Link は `enhanceDefaultPaste: true` で **通常の `Ctrl+V` を乗っ取ってカード化する**。素のリンクとして貼りたいときは `Ctrl+Shift+V`。

Tasks は `globalFilter` が空なので **Vault 内の全チェックボックスがタスク扱い**になる。特定タグだけをタスクにしたいなら設定 → Tasks で `globalFilter` を入れる。

## 既定で無効・未設定のまま置いてあるもの

| プラグイン | 状態 | どうするか |
|---|---|---|
| Linter | 有効ルール 0・`lintOnSave` も `false` | 使うなら `yaml-timestamp` / `consecutive-blank-lines` / `heading-blank-lines` / `trailing-spaces` あたりを ON にする。その際 `foldersToIgnore` に **`90_Templates` を必ず入れる**（Templater 構文が壊れる） |
| Iconize | アイコン 0・ルール 0 | フォルダ右クリック → Change icon、または `rules` で正規表現一括指定 |
| Style Settings / Commander / Kanban / Mind Map | 全デフォルト | 使い始めてから設定 |

## コアプラグイン

明示的に ON にしているもの: **Web ビュアー**（`webviewer`）/ **ワークスペース**（`workspaces`）/ **スラッシュコマンド**（`slash-command`）。

**デイリーノート（`daily-notes`）は意図的に OFF。** Periodic Notes と競合するため。日次ノートは Periodic Notes が担当する。

ほかに OFF: 脚注 / ランダムノート / ユニークノート作成 / 音声録音 / Markdown インポーター / 公開。

## テーマ

`appearance.json` は `cssTheme: "Minimal"`（by @kepano）。テーマ本体は同梱していないので、設定 → 外観 → テーマを管理 からインストールする。`obsidian-minimal-settings` の `data.json`（行幅 80 / 広い行幅 88 / 最大幅 88% / 本文 16px / 行間 1.5 など）が効くのは Minimal を入れたときだけ。入れなくても Vault は問題なく動く。確認バージョンは Minimal 9.0.2。

### 表示領域の横幅

「行の長さを読みやすくする」（`app.json` の `readableLineLength`）はオンのまま、本文の最大幅を Minimal の行幅で決めている。

| 設定 | 値 | 意味 |
|---|---|---|
| 行幅（`lineWidth`） | 80 | 本文の幅の上限。約 1280px（16px の日本語でおよそ 80 文字） |
| 広い行幅（`lineWidthWide`） | 88 | `cssclasses: [wide]` を付けたノートや幅広表示の要素に使う幅 |
| 最大幅（`maxWidth`） | 88 | 表示領域に対する上限（%）。画面が狭いときはこちらが効く |

1920x1080 の画面でファイル一覧を開いた状態で、本文が約 1280px になり左右に少し余白が残る幅にしてある。Windows の表示倍率が 125% など表示領域が狭い環境では、最大幅 88% で自動的に収まる。もっと狭くしたい場合は、設定 → Minimal Theme Settings → Line width で値を下げる（以前の既定は 40）。

## CSS スニペット

`.obsidian/snippets/mermaid-fit.css` を同梱し、`appearance.json` の `enabledCssSnippets` で有効にしてある。Mermaid の図は自然な幅を `max-width` で書き込むため、本文より広い図が右にはみ出して横スクロールになる。このスニペットで図の上限を本文の幅に置き換える。不要なら 設定 → 外観 → CSS スニペット でオフにする。

## QuickAdd マクロを手で作り直す場合

`quickadd/data.json` と `hotkeys.json` を同梱しているので通常は不要。壊れたときの再構築手順:

1. 設定 → QuickAdd → **Manage Macros** → 新規マクロ
2. そのマクロに **User Script** を 1 つだけ追加し `90_Templates/scripts/new-dated-file.js` を選択
3. **Macro** タイプの choice を追加してそのマクロを指定
4. choice の稲妻アイコンでコマンド化 → 設定 → ホットキーで `Ctrl+Alt+N` に割り当て

> ⚠️ **手順 2 で User Script のほかに Choice コマンドを追加しないこと。** マクロ自身を指す Choice を入れると自己再帰（スクリプト実行 → 自分自身を実行 → …）になる。マクロ内のコマンドは User Script 1 件だけが正しい。
