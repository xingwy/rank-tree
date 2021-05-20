enum Color {
    Black,
    Red,
}

export type Pair = [string, number];

export class RBTreeNode {
    public parent: RBTreeNode;
    public left: RBTreeNode;
    public right: RBTreeNode;
    public color: Color;
    public key: string;
    public score: number;
    public index: number;

    constructor(k: string, s: number, p: RBTreeNode = null, l: RBTreeNode = null, r: RBTreeNode = null) {
        this.color = Color.Red;
        this.parent = p;
        this.key = k;
        this.score = s;
        this.left = l;
        this.right = r;
        this.index = 1;
    }

    public setBlack(): void {
        this.color = Color.Black;
    }

    public setRed(): void {
        this.color = Color.Red;
    }

    public recolor(): void {
        this.color == Color.Red ? (this.color = Color.Black) : (this.color = Color.Red);
    }

    public setColor(color: Color): void {
        this.color = color;
    }

    public isRed(): boolean {
        return this.color == Color.Red;
    }

    public isBlack(): boolean {
        return this.color == Color.Black;
    }

    public isRoot(): boolean {
        return this.parent == null;
    }

    public isLeftChild(): boolean {
        if (this.parent == null) {
            return false;
        }
        return this.parent.left == this;
    }

    public isRightChild(): boolean {
        if (this.parent == null) {
            return false;
        }
        return this.parent.right == this;
    }

    public isLeaf(): boolean {
        return this.left == null && this.right == null;
    }

    public getBrother(): RBTreeNode {
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

    public hasChild(): boolean {
        return !!(this.left || this.right);
    }

}