import { Frame } from "./ui/frame";
import { MenuBar, MenuItem, MenuItemSeparator } from "./ui/menu";

class MainFrame extends Frame {
  _menuBar?: MenuBar;

  _onInit() : void {
    console.log("init");
    this._menuBar = new MenuBar(this);
    this._menuBar._appendNestedMenuItems([
      [
        "ファイル",
        new MenuItem("新規作成", "Ctrl + N"),
        new MenuItem("開く", "Ctrl + O"),
        new MenuItem("保存", "Ctrl + S"),
        new MenuItem("名前つけて保存", "Ctrl + Shift + S"),
        new MenuItemSeparator(),
        [
          "サブメニュー 0",
          new MenuItem("項目 0"),
          new MenuItem("項目 1"),
          [
            "サブメニュー 1",
            new MenuItem("項目 3"),
            new MenuItem("項目 4"),
            new MenuItem("項目 5")
          ],
          new MenuItem("項目 2")
        ]
      ],
      [
        "編集",
        new MenuItem("元に戻す", "Ctrl + Z"),
        new MenuItem("やり直す", "Ctrl + Y"),
        new MenuItemSeparator(),
        new MenuItem("切り取り", "Ctrl + X"),
        new MenuItem("コピー", "Ctrl + C"),
        new MenuItem("貼り付け", "Ctrl + V"),
        new MenuItem("削除", "Delete"),
        new MenuItemSeparator(),
        new MenuItem("全て選択", "Ctrl + A")
      ],
      [
        "表示",
        new MenuItem("メニュー バー"),
        new MenuItem("ステータス バー")
      ],
      [
        "ツール",
        new MenuItem("環境設定")
      ],
      [
        "ヘルプ",
        new MenuItem("ヘルプ")
      ]
    ]);
    this._menuBar._eventOnItemClick = function(item) {
      let elm = document.createElement("div");
      elm.style.textAlign = "center";
      elm.innerText = item._getLabel();
      document.getElementById("app")?.appendChild(elm);
    }
  }
}

export let mainFrame = new MainFrame(document.getElementById("app"));
