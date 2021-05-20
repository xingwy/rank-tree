"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBTreeNode = void 0;
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["Red"] = 1] = "Red";
})(Color || (Color = {}));
class RBTreeNode {
    constructor(k, s, p = null, l = null, r = null) {
        this.color = Color.Red;
        this.parent = p;
        this.key = k;
        this.score = s;
        this.left = l;
        this.right = r;
        this.index = 1;
    }
    setBlack() {
        this.color = Color.Black;
    }
    setRed() {
        this.color = Color.Red;
    }
    recolor() {
        this.color == Color.Red ? (this.color = Color.Black) : (this.color = Color.Red);
    }
    setColor(color) {
        this.color = color;
    }
    isRed() {
        return this.color == Color.Red;
    }
    isBlack() {
        return this.color == Color.Black;
    }
    isRoot() {
        return this.parent == null;
    }
    isLeftChild() {
        if (this.parent == null) {
            return false;
        }
        return this.parent.left == this;
    }
    isRightChild() {
        if (this.parent == null) {
            return false;
        }
        return this.parent.right == this;
    }
    isLeaf() {
        return this.left == null && this.right == null;
    }
    getBrother() {
        if (!this.parent) {
            return null;
        }
        if (this.parent.left == this) {
            return this.parent.right;
        }
        if (this.parent.right == this) {
            return this.parent.left;
        }
        return null;
    }
    hasChild() {
        return !!(this.left || this.right);
    }
}
exports.RBTreeNode = RBTreeNode;
//# sourceMappingURL=RB_node.js.map