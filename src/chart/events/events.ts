import { Tick } from "../chart";
import { ChartObject } from "../chart-object";

export class Event extends ChartObject {
  _create() { return new Event(); }
}

export class EventTimeline extends Event {
  _tick: Tick = 0;
  _timelineId: number = 0;
  _speed: number = 0;

  _create() { return new EventTimeline(); }
}

export class EventSpeedModifier extends Event {
  _tick: Tick = 0;
  _speed: number = 0;

  _create() { return new EventSpeedModifier(); }
}

export class EventBpmChange extends Event {
  _tick: Tick = 0;
  _bpm: number = 0;

  _create() { return new EventBpmChange(); }
}

export class EventBeatChange extends Event {
  _bar: number = 0;
  _beatsPerBar: number = 0;
  _beatUnit: number = 1;

  _create() { return new EventBeatChange(); }
}

export class EventBarBreaker extends Event {
  _bar: number = 0;

  _create() { return new EventBarBreaker(); }
}

export class EventBookmark extends Event {
  _uuid: string = "";
  _tick: Tick = 0;
  _name: string = "";
  _tagColor: string = "";

  _create() { return new EventBookmark(); }
}
