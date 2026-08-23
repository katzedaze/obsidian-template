/**
 * 新規 Canvas / Base を YYYY-MM-DD の日付名で作成する。
 *
 * Obsidian には Canvas / Base のファイル名や作成先を指定する設定が存在しない
 * （Canvas は newFileLocation にも従わず vault 直下に作られる）。
 * このスクリプトはその両方を解決する。
 *
 * QuickAdd のユーザースクリプトとして使う:
 *   設定 → QuickAdd → Manage Macros → 新規マクロ → User Script でこのファイルを選択
 *   → そのマクロを Macro choice にして、コマンド化＋ホットキー割り当て
 *
 * 空ファイルの内容は Obsidian が実際に生成したものに合わせてある。
 */

const TARGET_FOLDER = "00_INBOX";

const FILE_TYPES = {
  canvas: { ext: "canvas", content: "{}" },
  base: { ext: "base", content: "views:\n  - type: table\n    name: 表\n" },
};

function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** 同名が既にあれば -2, -3 … を付けて衝突を避ける */
function availablePath(app, folder, base, ext) {
  let path = `${folder}/${base}.${ext}`;
  let n = 2;
  while (app.vault.getAbstractFileByPath(path)) {
    path = `${folder}/${base}-${n}.${ext}`;
    n += 1;
  }
  return path;
}

module.exports = async (params) => {
  const { app, quickAddApi } = params;

  const label = await quickAddApi.suggester(
    ["Canvas（無限ホワイトボード）", "Base（テーブル/データベース）"],
    ["canvas", "base"]
  );
  if (!label) return; // ユーザーがキャンセル

  const type = FILE_TYPES[label];

  // フォルダが無ければ作る（初回や誤削除時の保険）
  if (!app.vault.getAbstractFileByPath(TARGET_FOLDER)) {
    await app.vault.createFolder(TARGET_FOLDER);
  }

  const path = availablePath(app, TARGET_FOLDER, today(), type.ext);
  const file = await app.vault.create(path, type.content);

  await app.workspace.getLeaf(false).openFile(file);
};
