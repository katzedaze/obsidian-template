---
title: Welcome
created: 
tags: [dashboard]
---

# Welcome

Homepage プラグインが起動時にこのノートを開く。表は Dataview が生成するので、
ノートが 1 件も無いうちは空のままで正しい。

## 📥 INBOX（未処理）

```dataview
TABLE WITHOUT ID file.link AS ノート, file.ctime AS 作成日
FROM "00_INBOX"
SORT file.ctime DESC
```

## 🚀 進行中のプロジェクト

```dataview
TABLE WITHOUT ID file.link AS プロジェクト, status AS 状態, due AS 期限
FROM "10_Projects"
WHERE status != null AND status != "done"
SORT due ASC
```

## 📅 直近のデイリーノート

```dataview
TABLE WITHOUT ID file.link AS 日付
FROM "40_Journal"
WHERE !contains(file.folder, "Events")
SORT file.name DESC
LIMIT 7
```

## 🗓 予定（Full Calendar）

```dataview
TABLE WITHOUT ID file.link AS 予定, date AS 日付, startTime AS 開始, endTime AS 終了
FROM "40_Journal/Events"
SORT date DESC
LIMIT 10
```

## ✏️ 最近更新したノート

```dataview
TABLE WITHOUT ID file.link AS ノート, file.mtime AS 更新
FROM -"90_Templates" AND -"98_Assets" AND -"docs"
SORT file.mtime DESC
LIMIT 10
```

---

- [[README]] — この Vault の使い方とセットアップ手順
- [[CONVENTIONS]] — フォルダ運用ルールとプロパティ標準
- [[PLUGINS]] — プラグイン一覧と設定の意図
