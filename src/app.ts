import { Frame } from "./ui/frame";
import { MenuBar, MenuItem, MenuItemSeparator, MenuItemSpacer, ContextMenu } from "./ui/menu";
import { ToolBar, ToolBarButton, ToolBarButtonSeparator } from "./ui/toolbar";
import { ChartView } from "./app-ui/chart-view";

class MainFrame extends Frame {
  _menuBar?: MenuBar;
  _contextMenu?: ContextMenu;
  _toolBar?: ToolBar;
  _chartView?: ChartView;

  _onInit() : void {
    console.log("init");
    this._menuBar = new MenuBar(this);
    this._menuBar._appendNestedMenuItems([
      [
        "ファイル",
        new MenuItem("sync", "データの同期"),
        new MenuItemSeparator(),
        new MenuItem("open", "開く", "Ctrl + O"),
        new MenuItem("save", "上書き保存", "Ctrl + S"),
        new MenuItemSeparator(),
        new MenuItem("chart-prop", "譜面情報の編集"),
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
        new MenuItem("eraser", "消しゴム", "E"),
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
      ],
    ]);
    this._menuBar._eventOnItemClick = this._onCommand;

    this._menuBar._setCheckAll("lang-ja-jp", true);
    this._menuBar._setCheckAll("pen", true);

    this._toolBar = new ToolBar(this);
    this._toolBar._appendNestedMenuItems([
      new ToolBarButton("sync", "arrow-repeat", "データの同期"),
      new ToolBarButtonSeparator(),
      new ToolBarButton("open", "folder2", "開く"),
      new ToolBarButton("save", "save", "上書き保存"),
      new ToolBarButtonSeparator(),
      new ToolBarButton("undo", "arrow-90deg-left", "元に戻す"),
      new ToolBarButton("redo", "arrow-90deg-right", "やり直す"),
      new ToolBarButtonSeparator(),
      new ToolBarButton("cut-notes", "scissors", "切り取り"),
      new ToolBarButton("copy-notes", "files", "コピー"),
      new ToolBarButton("paste", "clipboard-fill", "貼り付け"),
      new ToolBarButtonSeparator(),
      new ToolBarButton("play", "play-fill", "再生"),
      new ToolBarButtonSeparator(),
      new ToolBarButton("pen", "pencil-fill", "ペン"),
      new ToolBarButton("eraser", "eraser-fill", "消しゴム"),
      new ToolBarButton("select", "bounding-box-circles", "選択"),
      new ToolBarButton("attr-edit", "screwdriver", "属性選択"),
      new ToolBarButtonSeparator(),
      [
        new ToolBarButton("quantize", "", "4 分音符"),
        new MenuItem("quantize-100", "4 分音符"),
        new MenuItem("quantize-100", "8 分音符"),
        new MenuItem("quantize-100", "16 分音符"),
        new MenuItem("quantize-100", "32 分音符"),
        new MenuItem("quantize-100", "64 分音符"),
        new MenuItem("quantize-100", "128 分音符"),
        new MenuItem("quantize-100", "256 分音符"),
        new MenuItem("quantize-100", "512 分音符"),
        new MenuItemSeparator(),
        new MenuItem("quantize-custom", "独自設定"),
      ],
      (() => {
        let x: any = [
          new ToolBarButton("til", "", "TIL 0")
        ];
        for(let i = 0; i < 16; ++i)
          x.push(new MenuItem("til-" + i, "TIL " + i));
        return x;
      })()
    ]);
    
    this._toolBar._eventOnItemClick = this._onCommand;
    this._toolBar._setCheckAll("pen", true);

    this._contextMenu = new ContextMenu(this);
    this._contextMenu._appendNestedMenuItems([
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
      [
        "a",
        new MenuItem("a", "a"),
        new MenuItem("b", "b"),
      ]
    ]);

    this._chartView = new ChartView(this);

    window.addEventListener("contextmenu", (e) => {
      this._contextMenu?._showPopup(e.clientX, e.clientY);
      e.preventDefault();
    });
    
    window.addEventListener("resize", (e) => {
      this._chartView?._adjustLayout();
    });

    const frameCallback: FrameRequestCallback = (time) => {
      this._onFrame();
      requestAnimationFrame(frameCallback);
    };
    
    requestAnimationFrame(frameCallback);
  }

  _onCommand(item: MenuItem) {
  }

  _onFrame() {
    this._chartView?._draw();
  }
}

export let mainFrame = new MainFrame(document.getElementById("app"));
