import xpath from './xpath';
class Parsers {
  static dom2json(el) {
    let e = null;
    this._el = el;
    if (el instanceof HTMLElement === false) {
      return;
    }
    e = el.parentElement !== null ? el.parentElement : el;
    return this._domParse(e);
  }
  static _domParse(e) {
    let i = 0;
    let j = {};
    j.t = e.tagName.toLowerCase();
    j.e = e;
    j.x = xpath.create(e);
    if (e === this._el) {
      j.s = true;
    }
    if (e.children.length > 0) {
      j.c = [];
      for (i = 0; i < e.children.length; i++) {
        j.c.push(this._domParse(e.children[i]));
      }
    }
    return j;
  }
}
export default Parsers; 
