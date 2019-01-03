import Node from './node';
import Settings from './settings';
import { Parsers, xpath } from './util';

export default class Tree {
  constructor() {
    this._canvas = document.getElementById('vt-canvas');
    this._events = {};
    if (!this._canvas) {
      this._canvas = document.createElement('canvas');
      this._canvas.setAttribute('id', 'vt-canvas');
      document.body.appendChild(this._canvas);
    }

    this._ctx = this._canvas.getContext('2d');

    this._canvas.addEventListener('mousemove', this._onMouseMove.bind(this));
    this._canvas.addEventListener('click', this._onClick.bind(this));
  }

  _onMouseMove(evt) {
    var box = {
      x: evt.x - this._canvas.getBoundingClientRect().x,
      y: evt.y - this._canvas.getBoundingClientRect().y
    };
    Tree.nodes.forEach((n) => {
      if (n.isOver(box)) {
        n.color = '#FF0000';
        n.draw(true);
      } else if (n.color !== '#0000FF') {
        n.color = '#0000FF';
        n.draw(true);
      }
    });
  }

  _onClick(evt) {
    let node = null;
    let events = this._events['select'];
    let box = {
      x: evt.x - this._canvas.getBoundingClientRect().x,
      y: evt.y - this._canvas.getBoundingClientRect().y
    };
    Tree.nodes.forEach((n) => {
      if (n.isOver(box)) {
        node = n;
      }
    });
    if (node === null) {
      return;
    }
    if (events) {
      events.forEach(callback => {
        callback({ data: node });
      });
    }
    this.setRoot(node.el);
  }
  setRoot(el) {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    Node.settings = new Settings();
    Tree.nodes.length = 0;
    Node.height = 0;

    this._root = new Node(Parsers.dom2json(el), null, 0, this._ctx);

    Tree.nodes.push(this._root);
    this._root.draw();
  }
  get selectedNode() {
    let s = null;
    Tree.nodes.forEach((n) => {
      if (n.s === true) {
        s = n;
      }
    });
    return s;
  }
  static get nodes() {
    if (!this._nodes) {
      this._nodes = [];
    }
    return this._nodes;
  }
  on(eventName, callback) {
    if (!eventName || typeof eventName !== 'string') {
      return false;
    }
    if (!callback || typeof callback !== 'function') {
      return false;
    }
    if (this._events[eventName] === undefined) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
  }
}
