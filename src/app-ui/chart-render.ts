import { Rect } from "../ui/util";
import { ChartViewState } from "./chart-view";
import * as Ug from "../chart/chart";
import * as MathUtil from "../math-util";

export const CHART_FIELD_MAX_WIDTH					  	  = 400;
export const CHART_FIELD_MIN_WIDTH				  	  	= 100;
export const CHART_FIELD_MARGIN_X				  	    	= 64;
export const CHART_FIELD_MARGIN_Y			      			= 24;
export const CHART_FIELD_TEXT_MARGIN_X		  			= 4;
export const CHART_FIELD_TEXT_MARGIN_Y	  				= 4;
export const CHART_FIELD_LINE_WIDTH				    		= 1;
export const CHART_FIELD_TEXT_HEIGHT		  		  	= 12;
export const CHART_FIELD_EVENT_TEXT_WIDTH		  		= 50;
export const CHART_FIELD_NOTE_HEIGHT			  	  	= 6;
export const CHART_FIELD_NOTE_HITTEST_HEIGHT			= 8;
export const CHART_FIELD_AIR_ACTION_NOTE_HEIGHT		= 4;
export const CHART_FIELD_SLIDE_CENTER_X				  	= 2;
export const CHART_FIELD_SLIDE_HITTEST_CENTER_X	  = 10;

export const CHART_FIELD_SIDEVIEW_MARGIN_X				= 24;
export const CHART_FIELD_SIDEVIEW_WIDTH				  	= 240;
export const CHART_FIELD_SIDEVIEW_NOTE_HEIGHT			= 8;
export const CHART_FIELD_SIDEVIEW_NOTE_WIDTH			= 8;
export const CHART_FIELD_SIDEVIEW_LANES           = 36.0;

export const CHART_FIELD_COLOR_BORDER	  	  	  	= MathUtil.ColorRefToCSS(0x00CCCCCC);
export const CHART_FIELD_COLOR_MEAS			        	= MathUtil.ColorRefToCSS(0x00999999);
export const CHART_FIELD_COLOR_GRID	    			    = MathUtil.ColorRefToCSS(0x00555555);
export const CHART_FIELD_COLOR_SUBGRID	  			  = MathUtil.ColorRefToCSS(0x00222222);
export const CHART_FIELD_COLOR_CURSOR		     	  	= MathUtil.ColorRefToCSS(0x000000ff);
export const CHART_FIELD_COLOR_SELECTION	  	  	= MathUtil.ColorRefToCSS(0x00FFFFFF);
export const CHART_FIELD_COLOR_ORANGE				      = MathUtil.ColorRefToCSS(0x0055AAFF);
export const CHART_FIELD_COLOR_GREEN		    	  	= MathUtil.ColorRefToCSS(0x0022EE22);
export const CHART_FIELD_COLOR_PINK	    			    = MathUtil.ColorRefToCSS(0x006666FF);
export const CHART_FIELD_COLOR_TAP			  	   	  = MathUtil.ColorRefToCSS(0x000000CC);
export const CHART_FIELD_COLOR_EXTAP    			   	= MathUtil.ColorRefToCSS(0x0000CCCC);
export const CHART_FIELD_COLOR_EX_SLIDE_HOLD_BEGIN = MathUtil.ColorRefToCSS(0x0040CCBF);
export const CHART_FIELD_COLOR_FLICK_BG		  	    = MathUtil.ColorRefToCSS(0x00887777);
export const CHART_FIELD_COLOR_FLICK_FG		    	  = MathUtil.ColorRefToCSS(0x00EEEE00);
export const CHART_FIELD_COLOR_DAMAGE		  		    = MathUtil.ColorRefToCSS(0x00770000);
export const CHART_FIELD_COLOR_SLIDE_STEP		  	  = MathUtil.ColorRefToCSS(0x00EE3300);
export const CHART_FIELD_COLOR_SLIDE_CENTER	    	= MathUtil.ColorRefToCSS(0x00FFEE00);
export const CHART_FIELD_COLOR_SLIDE_CURVE_CONTROL = MathUtil.ColorRefToCSS(0x00000000);
export const CHART_FIELD_COLOR_HOLD_STEP    			= MathUtil.ColorRefToCSS(0x000077EE);
export const CHART_FIELD_COLOR_TAP_LINE 	    		= MathUtil.ColorRefToCSS(0x00EEEEEE);

export const CHART_FIELD_COLOR_SLIDE_BG_1 		  	= MathUtil.ColorRefToCSS(0x00D74FA5);
export const CHART_FIELD_COLOR_SLIDE_BG_2	    		= MathUtil.ColorRefToCSS(0x00FFFF00);
export const CHART_FIELD_COLOR_SLIDE_BG_3		  	  = MathUtil.ColorRefToCSS(0x00AF4FD6);
export const CHART_FIELD_COLOR_HOLD_BG_1		    	= MathUtil.ColorRefToCSS(0x00AD50D8);
export const CHART_FIELD_COLOR_HOLD_BG_2	  		  = MathUtil.ColorRefToCSS(0x0000E4FF);
export const CHART_FIELD_COLOR_HOLD_BG_3  			  = MathUtil.ColorRefToCSS(0x00D64FA6);

export const CHART_FIELD_COLOR_AIR_UP	  	  	  	= MathUtil.ColorRefToCSS(0x0000FF00);
export const CHART_FIELD_COLOR_AIR_DOWN   	  		= MathUtil.ColorRefToCSS(0x00FF00FF);
export const CHART_FIELD_COLOR_AIR_EDGE		       	= MathUtil.ColorRefToCSS(0x00FFFFFF);
export const CHART_FIELD_COLOR_AIR_ACTION		    	= MathUtil.ColorRefToCSS(0x00FF00FF);
export const CHART_FIELD_COLOR_AIR_CRUSH_CENTER	  = MathUtil.ColorRefToCSS(0x00BB00FF);
export const CHART_FIELD_COLOR_AIR_CRUSH		    	= MathUtil.ColorRefToCSS(0x00FF005E);
export const CHART_FIELD_COLOR_AIR_CRUSH_EMP	  	= MathUtil.ColorRefToCSS(0x00AB57FF);

export const AIR_WIDTH_RATIO = [ 0, 0.40, 0.50, 0.63, 0.69, 0.70, 0.70, 0.73, 0.75, 0.765, 0.78, 0.795, 0.81, 0.825, 0.84, 0.855, 0.87 ];

export const CHART_FIELD_COLOR_AIR_CRUSH_CUSTOM = [
	0x0000E3,
	0x00B6E3,
	0x00FFF6,
	0x04E300,
	0xE3DB00,
	0xE02F3B,
	0xE3007D,
	0xC400D9,
	0x000000,
	0xFFFFFF,
	0x4D4846,
	0x00FF99,
	0xFFB300,
	0xFF8D00
];

export class RenderMeasures {
  _rect: Rect = new Rect();
  _sideRect: Rect = new Rect();
  _visibleRangeBegin: Ug.Tick = 0;
  _visibleRangeEnd: Ug.Tick = 0;
  _visibleRange: Ug.Tick = 0;
}

export class ChartRenderer {
  _state: ChartViewState;

  constructor(state: ChartViewState) {
    this._state = state;
  }

  _calcMeasures() : RenderMeasures {
    let rm = new RenderMeasures();
    let sideViewWidth = CHART_FIELD_SIDEVIEW_WIDTH + CHART_FIELD_SIDEVIEW_MARGIN_X;
    if (this._state._screenWidth < (CHART_FIELD_MAX_WIDTH + sideViewWidth)) {
      let fieldWidth = Math.max(Math.min(this._state._screenWidth, CHART_FIELD_MAX_WIDTH) - CHART_FIELD_MARGIN_X * 2, 100);
      rm._rect._left = this._state._screenWidth / 2 - fieldWidth / 2;
      rm._rect._right = rm._rect._left + fieldWidth;
    }
    else {
      let fieldWidth = CHART_FIELD_MAX_WIDTH - CHART_FIELD_MARGIN_X * 2;
      rm._rect._left = this._state._screenWidth / 2 - (CHART_FIELD_MAX_WIDTH + sideViewWidth) / 2 + sideViewWidth + CHART_FIELD_MARGIN_X;
      rm._rect._right = rm._rect._left + fieldWidth;
    }
    rm._rect._top = 0;
    rm._rect._bottom = this._state._screenHeight;

    rm._sideRect._left = rm._rect._left - CHART_FIELD_MARGIN_X - CHART_FIELD_SIDEVIEW_WIDTH - CHART_FIELD_SIDEVIEW_MARGIN_X;
    rm._sideRect._right = rm._rect._left - CHART_FIELD_MARGIN_X - CHART_FIELD_SIDEVIEW_MARGIN_X;
    rm._sideRect._top = rm._rect._top;
    rm._sideRect._bottom = rm._rect._bottom;

    rm._visibleRange = 10 * rm._rect._height / this._getZoomCoef();
    rm._visibleRangeBegin = Math.max(this._state._scrollY, 0) + -480 / this._getZoomCoef();
    rm._visibleRangeEnd = rm._visibleRangeBegin + rm._visibleRange;
    return rm;
  }

  _getZoomCoef() : number {
    if (this._state._zoomLevel == 1) return 2;
    if (this._state._zoomLevel == 2) return 3;
    if (this._state._zoomLevel == 3) return 4;
    if (this._state._zoomLevel == 4) return 5;
    if (this._state._zoomLevel == 5) return 10;
    if (this._state._zoomLevel == 6) return 20;
    if (this._state._zoomLevel == 7) return 40;
    if (this._state._zoomLevel == 8) return 80;
    if (this._state._zoomLevel >= 9) return 160;
    return 1;
  }

  _draw(ctx: CanvasRenderingContext2D) {
    const rm: RenderMeasures = this._calcMeasures();

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, this._state._screenWidth, this._state._screenHeight);
  
    this._drawLaneLines(ctx, rm);
  }

  _drawLaneLines(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for (let i = 0; i < 17; ++i) {
      canvasDrawLine(
        ctx,
        MathUtil.mix(rm._rect._left, rm._rect._right, i / 16.0), rm._rect._top,
        MathUtil.mix(rm._rect._left, rm._rect._right, i / 16.0), rm._rect._bottom,
        (i % 2) == 0 ? CHART_FIELD_COLOR_GRID : CHART_FIELD_COLOR_SUBGRID,
        CHART_FIELD_LINE_WIDTH);
    }
    
    // 側面図
    for (let i = 0; i < CHART_FIELD_SIDEVIEW_LANES; i += 4) {
      canvasDrawLine(
        ctx,
        MathUtil.mix(rm._sideRect._right, rm._sideRect._left, i / CHART_FIELD_SIDEVIEW_LANES), rm._rect._top,
        MathUtil.mix(rm._sideRect._right, rm._sideRect._left, i / CHART_FIELD_SIDEVIEW_LANES), rm._rect._bottom,
        (i == 8 || i == 0) ? CHART_FIELD_COLOR_GRID : CHART_FIELD_COLOR_SUBGRID,
        CHART_FIELD_LINE_WIDTH);
    }
    
    canvasDrawLine(
      ctx,
      rm._sideRect._right - 2, rm._rect._top,
      rm._sideRect._right - 2, rm._rect._bottom,
      CHART_FIELD_COLOR_GRID,
      CHART_FIELD_LINE_WIDTH);
  }
}

function canvasDrawLine(ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  color: string, width: number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
