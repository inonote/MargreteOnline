import * as Ug from "../chart";
import { LineIteratior, toBoolean } from "./parser-util";

enum Block {
  ROOT,
  META,
  HEADER,
  NOTES
}

const MGXC_VERSION = 3;

export class ChartMgxcParser {
  private constructor() { }

  protected static _lastParentNote?: Ug.Note;
  protected static _lastNote?: Ug.Note;

  static _parse(buf: string) : Ug.Chart|null {
    let itr = new LineIteratior(buf);
    let version = 0;
    let currentBlock = Block.ROOT;
    let chart = new Ug.Chart();

    for(const line of itr) {
      let args = line.split("\t");
      if (args[0] === "BEGIN") {
        if (args.length < 2)
          continue;

        if (args[1] === "META") currentBlock = Block.META;
        else if (args[1] === "HEADER") currentBlock = Block.HEADER;
        else if (args[1] === "NOTES") currentBlock = Block.NOTES;
      }
      else if (currentBlock === Block.ROOT) {
        if (args.length < 2)
          continue;

        if (args[0] === "VERSION")
          version = parseInt(args[1], 10);
      }
      else {
        if (version !== MGXC_VERSION) // バージョン適合しない
          return null;

        switch (currentBlock) {
          case Block.META:
            ChartMgxcParser._parseMeta(chart, args);
            break;
          case Block.HEADER:
            ChartMgxcParser._parseHeader(chart, args);
            break;
          case Block.NOTES:
            ChartMgxcParser._parseNotes(chart, args);
            break;
        }
      }
    }

    ChartMgxcParser._lastParentNote = undefined;
    ChartMgxcParser._lastNote = undefined;
    return chart;
  }

  protected static _parseMeta(chart: Ug.Chart, args: string[]) : boolean {
    if (args[0] === "TITLE") {
      if (args.length < 2)
        return false;
      chart._meta._title = args[1];
      return true;
    }

    if (args[0] === "SORT") {
      if (args.length < 2)
        return false;
      chart._meta._sortTitle = args[1];
      return true;
    }

    if (args[0] === "ARTIST") {
      if (args.length < 2)
        return false;
      chart._meta._artist = args[1];
      return true;
    }

    if (args[0] === "GENRE") {
      if (args.length < 2)
        return false;
      chart._meta._genre = args[1];
      return true;
    }

    if (args[0] === "DESIGNER") {
      if (args.length < 2)
        return false;
      chart._meta._designer = args[1];
      return true;
    }

    if (args[0] === "DIFFICULTY") {
      if (args.length < 2)
        return false;
      chart._meta._diff = parseInt(args[1], 10);
      return true;
    }

    if (args[0] === "PLAYLEVEL") {
      if (args.length < 2)
        return false;
      chart._meta._playLevel = args[1];
      return true;
    }

    if (args[0] === "WEATTRIBUTE") {
      if (args.length < 2)
        return false;
      chart._meta._weAttr = args[1];
      return true;
    }

    if (args[0] === "CHARTCONST") {
      if (args.length < 2)
        return false;
      chart._meta._chartConst = parseFloat(args[1]);
      return true;
    }

    if (args[0] === "SONGID") {
      if (args.length < 2)
        return false;
      chart._meta._songId = args[1];
      return true;
    }

    if (args[0] === "BGM") {
      if (args.length < 2)
        return false;
      chart._meta._bgmFileName = args[1];
      return true;
    }

    if (args[0] === "BGMOFFSET") {
      if (args.length < 2)
        return false;
      chart._meta._bgmOffset = parseFloat(args[1]);
      return true;
    }

    if (args[0] === "BGMPREVIEW") {
      if (args.length < 3)
        return false;
      chart._meta._bgmPreviewTime[0] = parseFloat(args[1]);
      chart._meta._bgmPreviewTime[1] = parseFloat(args[2]);
      return true;
    }

    if (args[0] === "JACKET") {
      if (args.length < 2)
        return false;
      chart._meta._jacketFileName = args[1];
      return true;
    }

    if (args[0] === "BG") {
      if (args.length < 2)
        return false;
      chart._meta._bgFileName = args[1];
      return true;
    }

    if (args[0] === "BGSCENE") {
      if (args.length < 2)
        return false;
      chart._meta._bgSceneId = args[1];
      return true;
    }

    if (args[0] === "BGSYNC") {
      if (args.length < 2)
        return false;
      chart._meta._bgSync = toBoolean(args[1]);
      return true;
    }

    if (args[0] === "FIELDCOL") {
      if (args.length < 2)
        return false;
      chart._meta._fieldColor = args[1];
      return true;
    }

    if (args[0] === "FIELDBG") {
      if (args.length < 2)
        return false;
      chart._meta._fieldBgFileName = args[1];
      return true;
    }

    if (args[0] === "FIELDSCENE") {
      if (args.length < 2)
        return false;
      chart._meta._fieldBgSceneId = args[1];
      return true;
    }

    if (args[0] === "MAINTIL") {
      if (args.length < 2)
        return false;
      chart._meta._measTimelineId = parseInt(args[1], 10);
      return true;
    }

    if (args[0] === "MAINBPM") {
      if (args.length < 2)
        return false;
      chart._meta._mainBpm = parseFloat(args[1]);
      return true;
    }

    if (args[0] === "TUTORIAL") {
      if (args.length < 2)
        return false;
      chart._meta._tutorial = toBoolean(args[1]);
      return true;
    }

    if (args[0] === "SOFFSET") {
      if (args.length < 2)
        return false;
      chart._meta._startOffset = toBoolean(args[1]);
      return true;
    }

    if (args[0] === "USECLICK") {
      if (args.length < 2)
        return false;
      chart._meta._useClick = toBoolean(args[1]);
      return true;
    }

    if (args[0] === "EXLONG") {
      if (args.length < 2)
        return false;
      chart._meta._margeExSlideHold = toBoolean(args[1]);
      return true;
    }

    if (args[0] === "BGMWAITEND") {
      if (args.length < 2)
        return false;
      chart._meta._bgmWaitForCompletion = toBoolean(args[1]);
      return true;
    }


    if (args[0] === "AUTHOR_LIST") {
      if (args.length < 2)
        return false;
      chart._meta._authorsInfo._authors = args[1];
      return true;
    }

    if (args[0] === "AUTHOR_SITES") {
      if (args.length < 2)
        return false;
      chart._meta._authorsInfo._sites = args[1];
      return true;
    }

    if (args[0] === "DLURL") {
      if (args.length < 2)
        return false;
      chart._meta._downloadUrl = args[1];
      return true;
    }

    if (args[0] === "COPYRIGHT") {
      if (args.length < 2)
        return false;
      chart._meta._licenseInfo._copyright = args[1];
      return true;
    }

    if (args[0] === "LICENSE") {
      if (args.length >= 2)
        chart._meta._licenseInfo._type = args[1];
      if (args.length >= 3)
        chart._meta._licenseInfo._url = args[2];
      return true;
    }

    if (args[0] === "COMMENT") {
      if (args.length < 2)
        return false;
      chart._meta._comment = args[1] + "\n";
      return true;
    }

    if (args[0] === "BMARKER") {
      if (args.length < 2)
        return false;
      
      let e = new Ug.EventBarBreaker();
      e._bar = parseInt(args[1], 10);
      chart._events._appendChild(e);
      return true;
    }

    if (args[0] === "BKMRK") {
      if (args.length < 5)
        return false;
      
      let e = new Ug.EventBookmark();
      e._uuid = args[1];
      e._tick = parseInt(args[2], 10);
      e._name = args[3];
      e._tagColor = args[4];
      chart._events._appendChild(e);
      return true;
    }
    return false;
  }

  protected static _parseHeader(chart: Ug.Chart, args: string[]) : boolean {
    if (args[0] === "BPM") {
      if (args.length < 3)
        return false;
      
      let e = new Ug.EventBpmChange();
      e._tick = parseInt(args[1], 10);
      e._bpm = parseFloat(args[2]);
      chart._events._appendChild(e);
      return true;
    }

    if (args[0] === "BEAT") {
      if (args.length < 4)
        return false;
      
      let e = new Ug.EventBeatChange();
      e._bar = parseInt(args[1], 10);
      e._beatsPerBar = parseInt(args[2], 10);
      e._beatUnit = parseInt(args[3], 10);
      if (e._bar >= 0)
        chart._events._appendChild(e);
      return true;
    }

    if (args[0] === "TIL") {
      if (args.length < 4)
        return false;
      
      let e = new Ug.EventTimeline();
      e._timelineId = parseInt(args[1], 10);
      e._tick = parseInt(args[2], 10);
      e._speed = parseFloat(args[3]);
      chart._events._appendChild(e);
      return true;
    }

    if (args[0] === "SPDMOD") {
      if (args.length < 3)
        return false;
      
      let e = new Ug.EventSpeedModifier();
      e._tick = parseInt(args[1], 10);
      e._speed = parseFloat(args[2]);
      chart._events._appendChild(e);
      return true;
    }
    return false;
  }

  protected static _parseNotes(chart: Ug.Chart, args: string[]) : boolean {
    if (args.length < 10)
      return false;
    
    let note: Ug.Note|undefined;
    let isChildNote = false;
    let isPairNote = false;

    let noteName = args[0].substr(-1);

    if (noteName === "t") { note = new Ug.Tap; }
    else if (noteName === "e") { note = new Ug.ExTap; }
    else if (noteName === "f") {
      let exNote = new Ug.Flick;

      if (args[2] == "L") exNote._direction = Ug.FlickDirection.LEFT;
      else if (args[2] == "R") exNote._direction = Ug.FlickDirection.RIGHT;
      else exNote._direction = Ug.FlickDirection.AUTO;
      
      note = exNote;
    }
    else if (noteName === "d") { note = new Ug.Damage; }

    else if (noteName === "s") {
      if (args[1] === "BG") note = new Ug.Slide;
      else if (args[1] === "ST" || args[1] === "EN") {
        let exNote = new Ug.SlideChild;
        exNote._type = Ug.SlideChildType.STEP;
        note = exNote;
        isChildNote = true;
      }
      else if (args[1] === "LC") {
        let exNote = new Ug.SlideChild;
        exNote._type = Ug.SlideChildType.CONTROL;
        note = exNote;
        isChildNote = true;
      }
      else if (args[1] === "CC") {
        let exNote = new Ug.SlideChild;
        exNote._type = Ug.SlideChildType.CURVE_CONTROL;
        note = exNote;
        isChildNote = true;
      }
    }

    else if (noteName === "a") {
      let exNote = new Ug.Air;
      
      if (args[2] == "U") exNote._direction = Ug.AirDirection.UP;
      else if (args[2] == "D") exNote._direction = Ug.AirDirection.DOWN;
      else if (args[2] == "UL") exNote._direction = Ug.AirDirection.UPLEFT;
      else if (args[2] == "UR") exNote._direction = Ug.AirDirection.UPRIGHT;
      else if (args[2] == "DL") exNote._direction = Ug.AirDirection.DOWNLEFT;
      else if (args[2] == "DR") exNote._direction = Ug.AirDirection.DOWNRIGHT;
      else exNote._direction = Ug.AirDirection.UP;

      exNote._inverted = args[3] === "IV";

      note = exNote;
      isPairNote = true;
    }

    if (!note)
      return false;
    
    note._tick = parseInt(args[4]);
    note._x = parseInt(args[5]);
    note._width = parseInt(args[6]);
    note._timelineId = parseInt(args[8]);
    
    if (isChildNote)
      ChartMgxcParser._lastParentNote?._appendChild(note);
    else
      chart._notes._appendChild(note);
    
    if (isPairNote) {
      ChartMgxcParser._lastNote?._makePair(note);
    }

    if (!isChildNote)
      ChartMgxcParser._lastParentNote = note;
    ChartMgxcParser._lastNote = note;
    return true;
  }
}
