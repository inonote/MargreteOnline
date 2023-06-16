export function mix(x: number, y: number, a: number): number
  { return x * (1.0 - a) + y * a; }

export function mixi(x: number, y: number, a: number): number
  { return Math.round(mix(x, y, a)); }

export function relative(x: number, y: number, a: number): number
  { return (a - x) / (y - x); }

export function ColorRefToCSS(x: number): string {
  return "#" + ("00" + (x & 0xFF).toString(16)).substr(-2) +
          ("00" + ((x >> 8) & 0xFF).toString(16)).substr(-2) +
          ("00" + ((x >> 16) & 0xFF).toString(16)).substr(-2);
}

export function _ptInRect(x: number, y: number, x0: number, y0: number, x1: number, y1: number) : boolean {
  return x0 <= x && x < x1 && y0 <= y && y < y1;
}
