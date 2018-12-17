export default class Settings {
  constructor() {
    this.wGap = this.width / 2 + 10;
    this.hGap = this.height + 10;
  }
  get wGap() {
    return this._wGap === undefined ? 0 : this._wGap;
  }
  set wGap(v) {
    this._wGap = v;
  }
  get hGap() {
    return this._hGap === undefined ? 0 : this._hGap;
  }
  set hGap(v) {
    this._hGap = v;
  }
  get width() {
    return this._width === undefined ? 40 : this._width;
  }
  set width(v) {
    this._width = v;
  }
  get height() {
    return !this._height ? 15 : this._height;
  }
  set height(v) {
    this._height = v;
  }
  set tickHeight(v) {
    this._tickHeight = v;
  }
  get tickHeight() {
    return !this._tickHeight ? 5 : this._tickHeight;
  }
}
