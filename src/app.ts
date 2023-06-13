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
        new MenuItem("open", "開く", "Ctrl + O"),
        new MenuItem("save", "上書き保存", "Ctrl + S"),
        new MenuItemSeparator(),
        new MenuItem("sync", "譜面を同期")
      ],
      [
        "編集",
        new MenuItem("undo", "元に戻す", "Ctrl + Z"),
        new MenuItem("redo", "やり直す", "Ctrl + Y"),
        new MenuItemSeparator(),
        new MenuItem("cut-notes", "ノーツを切り取り", "Ctrl + X"),
        new MenuItem("copy-notes", "ノーツをコピー", "Ctrl + C"),
        new MenuItem("copy-events", "イベントをコピー", "Ctrl + Shift + C"),
        new MenuItem("paste", "貼り付け", "Ctrl + V"),
        new MenuItem("paste-fliped", "左右反転貼り付け", "Ctrl + Shift + V"),
        new MenuItemSeparator(),
        new MenuItem("select-all", "全選択", "Ctrl + A"),
        new MenuItem("select-head", "先頭からカーソル位置まで選択"),
        new MenuItem("select-tail", "カーソル位置から末尾まで選択"),
        new MenuItem("unselect", "選択解除", "Ctrl + Shift + A"),
        new MenuItemSeparator(),
        new MenuItem("delete-notes", "選択ノーツ削除", "Delete"),
        new MenuItem("delete-child-notes", "選択子ノーツ削除", "Ctrl + Delete"),
        new MenuItem("delete-events", "選択イベント削除", "Shift + Delete"),
        new MenuItem("move-til", "選択ノーツを現在のタイムラインに移動", "Ctrl + T"),
        new MenuItemSeparator(),
        new MenuItem("slide-begin-link", "SLIDE 始点連動無効", "F"),
      ],
      [
        "挿入",
        new MenuItem("insert-bpm", "BPM 変更イベント", "B"),
        new MenuItem("insert-speed", "譜面速度変更イベント", "N"),
        new MenuItem("insert-modifier", "ノーツ速度変更イベント", "D"),
        new MenuItem("insert-time-sig", "拍子変更イベント", "M")
      ],
      [
        "変形",
        new MenuItem("flip-h", "左右反転", "H"),
        new MenuItem("flip-v", "前後反転", "V"),
        new MenuItemSeparator(),
        new MenuItem("join-slide-step", "SLIDE 結合 - 中継点", "J"),
        new MenuItem("join-slide-ctrl", "SLIDE 結合 - 制御点", "Shift + J"),
        new MenuItem("split-slide", "SLIDE 分割", "K"),
        new MenuItem("slide-airslide", "SLIDE を AIR-SLIDE に変換", "G"),
        new MenuItem("airslide-slide", "AIR-SLIDE を SLIDE に変換"),
        new MenuItemSeparator(),
        new MenuItem("join-airtrace", "AIR-CRUSH 線結合"),
        new MenuItemSeparator(),
        new MenuItem("scale", "時間軸拡大 / 縮小", "L"),
      ],
      [
        "表示",
        new MenuItem("zoom-in", "時間軸拡大"),
        new MenuItem("zoom-up", "時間軸縮小"),
        new MenuItemSeparator(),
        new MenuItem("visible-slide-ctrl", "制御点ノーツ表示"),
        [
          "言語 / Language",
          new MenuItem("lang-ja-jp", "日本語"),
          new MenuItem("lang-en-us", "English"),
        ]
      ],
      [
        "ツール",
        new MenuItem("pen", "ペン", "W"),
        new MenuItem("select", "選択", "S"),
        new MenuItem("erasor", "消しゴム", "E"),
        new MenuItem("attr-edit", "属性編集モード", "A"),
      ],
      [
        "再生",
        new MenuItem("play", "現在の位置から再生", "Space"),
        new MenuItem("play-head", "始めから再生", "Ctrl + Space"),
        new MenuItemSeparator(),
        new MenuItem("metronome", "メトロノーム"),
        new MenuItem("fix-cursor-bottom", "カーソルを画面下部に固定"),
      ],
      [
        "ヘルプ",
        new MenuItem("f1-help", "使い方", "F1"),
        new MenuItemSeparator(),
        new MenuItem("about", "Margrete Online について..."),
      ]
    ]);
    this._menuBar._eventOnItemClick = function(item) {
      let elm = document.createElement("div");
      elm.style.textAlign = "center";
      elm.innerText = item._getId();
      document.getElementById("app")?.appendChild(elm);
    }

    this._menuBar._setCheckAll("lang-ja-jp", true);
    this._menuBar._setCheckAll("pen", true);
  }
}

export let mainFrame = new MainFrame(document.getElementById("app"));
