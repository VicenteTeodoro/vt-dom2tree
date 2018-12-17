class XPath {
  create(n) {
    return this._getPath(n);
  }
  _getPath(n) {
    let path = '';
    while (n !== null) {
      path = n.tagName + this._getIndex(n) + '/' + path;
      n = n.parentElement;
    }
    return path.substr(0, path.length - 1).toLowerCase();
  }
  _getIndex(n) {
    let p = n.parentElement;
    let c = null;
    let i = 0;
    if (p === null) return '';

    c = p.firstElementChild;
    while (c) {
      if (n === c) { break; }
      if (n.tagName === c.tagName) { i++; }
      c = c.nextElementSibling;
    }
    return '[' + (i + 1) + ']';
  }
  toElement(xpath) {
    let tokens = null;
    let parts = null;
    let e = document;
    let i = null;

    if (typeof xpath !== 'string' || xpath.length <= 0) {
      null;
    }
    tokens = xpath.split('/');
    tokens.forEach(item => {
      parts = item.split('[');
      e = e.getElementsByTagName(parts[0]);
      if (parts.length > 1) {
        e = e[parseInt(parts[1].replace(']', '')) - 1];
      } else {
        e = e[0];
      }
    });
    return e;
  }
}
let xpath = new XPath();
export default xpath;