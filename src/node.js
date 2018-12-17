import Tree from './tree';
export default class Node {
  constructor(data, parent, nth, ctx) {
    this._ctx = ctx;
    this.color = "#0000FF";
    this._ctx.strokeStyle = this.color;
    this._ctx.moveTo(0, 0);

    this.rect = { x: 1, y: parent ? parent.rect.h + Node.height : 1, w: Node.settings.width, h: Node.settings.height };
    this._data = data;
    this._parent = parent;
    this._nth = nth;

    if (this._parent) {
      this.rect.x += parent.rect.x + Node.settings.wGap;
      Node.height += Node.settings.hGap;
    } else {
      Node.height += 10;
    }

    if (!this._data.c) { return; }
    this._data.c.forEach((n, i) => {
      var n = new Node(n, this, i, this._ctx);
      n.draw();
      Tree.nodes.push(n);
    });
  }
  static get height() {
    return this._height === undefined ? 0 : this._height;
  }
  static set height(v) {
    this._height = v;
  }
  draw(jumpConnector) {
    let tm = null;
    this._ctx.strokeStyle = this.color;
    if (jumpConnector !== true) { this._drawConnector(); }
    if (this._data.s === true) {
      this._ctx.strokeStyle = "#00FFFF";
    }
    this._ctx.clearRect(this.rect.x - 1, this.rect.y - 1, this.rect.w + 2, this.rect.h + 2);
    this._ctx.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    tm = this._ctx.measureText(this._data.t);
    this._ctx.fillText(this._data.t, this.rect.x + this.rect.w / 2 - tm.width / 2, this.rect.y + this.rect.h / 2 + 2);
  }
  _drawConnector() {
    this._ctx.beginPath();
    this._ctx.moveTo(this.rect.x + this.rect.w / 2, this.rect.y - Node.settings.tickHeight);
    this._ctx.lineTo(this.rect.x + this.rect.w / 2, this.rect.y);
    this._ctx.stroke();

    if (this._parent === null) { return; }

    this._ctx.beginPath();
    this._ctx.moveTo(this.rect.x + this.rect.w / 2, this.rect.y - Node.settings.tickHeight);
    this._ctx.lineTo(this._parent.rect.x + this._parent.rect.w / 2, this.rect.y - Node.settings.tickHeight);
    this._ctx.stroke();

    this._ctx.beginPath();
    this._ctx.moveTo(this._parent.rect.x + this._parent.rect.w / 2, this.rect.y - Node.settings.tickHeight);
    this._ctx.lineTo(this._parent.rect.x + this._parent.rect.w / 2, this._parent.rect.y + (20 * this._nth));
    this._ctx.stroke();
  }
  isOver(evt) {
    return evt.x >= this.rect.x && evt.y >= this.rect.y && evt.x <= this.rect.x + this.rect.w && evt.y <= this.rect.y + this.rect.h;
  }
  get el() {
    return this._data.e;
  }
  get a() {
    return this._data.a;
  }
  get c() {
    return this._data.c;
  }
  get s() {
    return this._data.s;
  }
  get x() {
    return this._data.x;
  }
  static get settings() {
    return this._settings;
  }
  static set settings(settings) {
    this._settings = settings;
  }
}