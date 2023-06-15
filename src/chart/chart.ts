import * as Ug from "./chart-object-collection";


export const DEFAULT_RESOLUTION = 1920;
export type Tick = number;



export class NotePosition {
  _tick: Tick = 0;
  _x: number = 0;
  _width: number = 0;
  _height: number = 0;
  _children: NotePosition[] = [];
}



export * from "./chart-object-collection";



export enum ChartDiff {
	BASIC = 0,
	ADVANCED,
	EXPERT,
	MASTER,
	WORLDSEND,
	ULTIMA
}



export class ChartMeta {
  _resolution: number = DEFAULT_RESOLUTION;
  _title: string = "";
  _sortTitle: string = "";
  _artist: string = "";
  _genre: string = "";
  _designer: string = "";
  _diff: ChartDiff = ChartDiff.BASIC;
  _playLevel: string = "";
  _weAttr: string = "";
  _chartConst: number = 0;
  _songId: string = "";

  _bgmFileName: string = "";
  _bgmOffset: number = 0;
  _bgmPreviewTime: number[] = [ 0, 0 ];

  _jacketFileName: string = "";

  _bgFileName: string = "";
  _bgSceneId: string = "";

  _bgSync: boolean = true;

  _fieldColor: string = "";
  _fieldBgFileName: string = "";
  _fieldBgSceneId: string = "";

  _measTimelineId: number = 0;

  _mainBpm: number = 0;

  _tutorial: boolean = false;
  _startOffset: boolean = true;
  _useClick: boolean = true;
  _margeExSlideHold: boolean = false;
  _bgmWaitForCompletion: boolean = false;

  _authorsInfo = {
    _authors: "",
    _sites: ""
  };

  _downloadUrl: string = "";
  _licenseInfo = {
    _copyright: "",
    _type: "",
    _url: ""
  };

  _comment: string = "";
}



export class Chart {
  _meta: ChartMeta = new ChartMeta();
  _notes: Ug.Note = new Ug.Note();
  _events: Ug.Event = new Ug.Event();
}
