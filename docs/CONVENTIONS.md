---
title: CONVENTIONS
tags: [setup]
---

# 運用ルールとプロパティ標準

## PARA の解釈

本来の 4 カテゴリは `10_Projects` / `20_Areas` / `30_Resources` / `99_Archive`。`00_INBOX` は分類前の受け皿、`90_Templates` と `98_Assets` は**分類対象ではなく仕組みを支える置き場**なので、番号を離して PARA 本体と視覚的に分けている。

判定に迷ったときの目安:

| 問い | Yes | No |
|---|---|---|
| 「完了」の条件を書けるか | `10_Projects` | `20_Areas` |
| 環境や状況が変わったらこのファイルを書き換えるか | `20_Areas` | `30_Resources`（読むだけ） |

**プロジェクト完了時は一律にアーカイブしない。** 中身を「継続的な責任 → `20_Areas`」「参考資料 → `30_Resources`」「記録だけ → `99_Archive`」の 3 つに分解して移す。`90_Templates` と `98_Assets` はこの出口戦略の対象外。

**同じテーマのファイルが 5 件たまるまでサブフォルダは作らない。** 1 ファイルしか入っていないフォルダは階層を増やすだけで何も整理していない。

## プロパティ標準

全ノート共通で `title` / `created` / `tags` を持たせる。用途別の追加プロパティ:

| 種類 | 追加プロパティ | 型 |
|---|---|---|
| プロジェクト | `status` / `due` | text / date |
| Full Calendar の予定 | `date` / `startTime` / `endTime` / `allDay` / `completed` | date / text / text / checkbox / date |

型は `.obsidian/types.json` に登録済み。**未登録だと Obsidian が全て文字列として扱い、日付ソートや Dataview の比較が効かなくなる。**

`types.json` には Tasks プラグインが自動追加する `TQ_*` 系（全 24 個）も入っている。タスククエリの表示制御用でプラグイン側が管理するもの。手で消さないこと。

## ノートの作成先（`.obsidian/app.json`）

| キー | 値 | 意味 |
|---|---|---|
| `newFileLocation` | `folder` | 新規ノートを指定フォルダに作る |
| `newFileFolderPath` | `00_INBOX` | その作成先 |
| `attachmentFolderPath` | `98_Assets` | 添付ファイルの保存先 |
| `readableLineLength` | `true` | 読みやすい行の長さ |
| `propertiesInDocument` | `visible` | プロパティを本文上部に表示 |
| `promptDelete` | `false` | 削除時の確認を出さない（`.trash/` 行き＋Git で戻せる前提） |

`promptDelete: false` は Git 運用が前提。Git を使わないなら `true` に戻しておくほうが安全。

## テンプレートの二重適用を避ける

テンプレートを当てる仕組みが複数あるので、次の 2 点で衝突を防いでいる。

- **Periodic Notes は Templater 構文を評価しない。** デイリーノートの適用は Templater に一本化し、Periodic Notes の `templatePath` は空にしてある。
- **Full Calendar は自分で frontmatter を書く。** `40_Journal/Events` を Templater の適用除外に入れてある。

コアの「テンプレート」プラグインも有効で置き場は同じ `90_Templates` だが、実運用は Templater 側に寄せている。

## デイリーノートのクエリを汚さない

[[Welcome]] の「直近のデイリーノート」は `FROM "40_Journal" WHERE !contains(file.folder, "Events")`。**空ファイルや検証用ノートを `40_Journal` に置いたままにするとここに混入する。**不要になったものは `99_Archive` に移すこと。

## 空フォルダと `.gitkeep`

`98_Assets/Excalidraw` や `40_Journal/Events` は空だと git が復元しない。プラグインの保存先設定がこれらのパスを指しているため、`.gitkeep` を置いてフォルダごと残している。
