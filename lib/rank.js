"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankTree = void 0;
const RB_node_1 = require("./RB_node");
class RankTree {
    constructor() {
        this._root = null;
        this._hash = new Map();
    }
    /**
     * 设置k-v
     * @param key
     * @param score
     */
    tadd(key, score) {
        if (this._hash.has(key)) {
            this._onUpdate(key, score);
        }
        else {
            let node = new RB_node_1.RBTreeNode(key, score);
            node.setRed();
            if (!this._root) {
                node.setBlack();
                this._root = node;
                this._hash.set(key, node);
            }
            else {
                this._onInsert(node, this._root);
            }
        }
    }
    /**
     * 增加某个字段积分
     * @param key
     * @param add
     */
    tincrease(key, add) {
        if (this._hash.has(key)) {
            let node = this._hash.get(key);
            let score = node.score + add;
            this._onUpdate(key, score);
        }
        else {
            let node = new RB_node_1.RBTreeNode(key, add);
            if (!this._root) {
                node.setBlack();
                this._root = node;
                this._hash.set(key, node);
            }
            else {
                this._onInsert(node, this._root);
            }
        }
    }
    /**
     * 扣除指定key值的积分
     * @param key
     * @param mul
     */
    treduce(key, mul) {
        if (this._hash.has(key)) {
            let node = this._hash.get(key);
            let score = node.score - mul;
            this._onUpdate(key, score);
        }
        else {
            let node = new RB_node_1.RBTreeNode(key, -mul);
            if (!this._root) {
                node.setBlack();
                this._root = node;
                this._hash.set(key, node);
            }
            else {
                this._onInsert(node, this._root);
            }
        }
    }
    /**
     * 获取排名
     * @param key
     * @returns
     */
    trank(key) {
        let node = this._hash.get(key);
        if (!node) {
            return -1;
        }
        return this._onGetIndex(this._root, node, 0);
    }
    /**
     * 指定积分的个数
     * @param min
     * @param max
     * @returns
     */
    tcount(minS, maxS) {
        // 定位到起始节点后中序遍历
        return this.trevrangebyscore(minS, maxS).length;
    }
    /**
     * 红黑树节点个数
     * @param min
     * @param max
     * @returns
     */
    tcard() {
        return this._hash.size;
    }
    /**
     * 返回指定序号的元素 升序
     * @param minI 1起始
     * @param maxI
     * @returns
     */
    trange(minI, maxI = 0) {
        let _min = Math.max(minI, 1);
        let _max;
        if (maxI == 0) {
            _max = this._hash.size;
        }
        else {
            _max = Math.min(maxI, this._hash.size);
        }
        let count = _max - _min + 1;
        let list = new Array();
        let node = this._findIndexStartNode(this._root, _min);
        if (!node) {
            return list;
        }
        this._LDR_selectIndexRange(node, list, count, _min, _min, _max);
        return list;
    }
    /**
     * 区间积分
     * @param minS
     * @param maxS
     * @returns
     */
    trevrangebyscore(minS, maxS = -1) {
        let list = new Array();
        let prev = this._findScoreStartNode(this._root, minS);
        if (!prev) {
            return list;
        }
        if (maxS == -1) {
            maxS = Infinity;
        }
        this._LDR_selectScoreRange(prev, list, minS, maxS);
        return list;
    }
    /**
     * 获取所有数据
     * @returns
     */
    tgetall() {
        let list = new Array();
        this._LDR_SCORE(this._root, list, Infinity);
        return list;
    }
    /**
     * 获取元素
     * @param key
     * @returns
     */
    tscore(key) {
        let node = this._hash.get(key);
        return node && node.score || 0;
    }
    /**
     * 删除指定key
     * @param key
     * @returns
     */
    trem(keys) {
        let _keys;
        if (!Array.isArray(keys)) {
            _keys = [keys];
        }
        else {
            _keys = keys;
        }
        _keys.forEach((key) => {
            let node = this._hash.get(key);
            if (!node) {
                return;
            }
            this._onRemove(node);
            this._hash.delete(key);
        });
    }
    /**
     * 获取指定序号元素·
     * @param index
     * @returns
     */
    tgetwithindex(index) {
        let node = this._findIndexStartNode(this._root, index);
        if (!node) {
            return null;
        }
        return [node.key, node.score];
    }
    /************************************** 以下为自调用函数 *********************************/
    /**
     * 寻找位置点
     * @param e
     * @param parent
     */
    _onInsert(e, parent) {
        if (this._compare(e, parent)) {
            parent.index++;
            if (!parent.left) {
                parent.left = e;
                e.parent = parent;
                this._hash.set(e.key, e);
                this._onTuneUp(e);
            }
            else {
                parent = parent.left;
                this._onInsert(e, parent);
            }
        }
        else {
            if (!parent.right) {
                parent.right = e;
                e.parent = parent;
                this._hash.set(e.key, e);
                this._onTuneUp(e);
            }
            else {
                parent = parent.right;
                this._onInsert(e, parent);
            }
        }
    }
    /**
     * 更新积分处理
     * @param key
     * @param score
     */
    _onUpdate(key, score) {
        // 直接删除 重新添加新值， 因为
        let e = this._hash.get(key);
        this._onRemove(e);
        let node = new RB_node_1.RBTreeNode(key, score);
        this._hash.set(key, node);
        if (!this._root) {
            node.setBlack();
            this._root = node;
            this._hash.set(key, node);
        }
        else {
            this._onInsert(node, this._root);
        }
    }
    /**
     * 移除
     * @param node
     * @returns
     */
    _onRemove(node) {
        let parent = node.parent;
        if (node.isLeaf()) {
            if (node.isRed()) {
                // 递归调整index
                // 红叶子节点 直接删除
                if (node.isLeftChild()) {
                    parent.left = null;
                    node.parent.index--;
                }
                else {
                    parent.right = null;
                }
            }
            else {
                // 先修复 再删除
                this._onRepairNode(node);
                if (node.isLeftChild()) {
                    node.parent.left = null;
                    node.parent.index--;
                }
                else {
                    node.parent.right = null;
                }
            }
            this._onRepairIndex(node.parent);
        }
        else {
            // 非叶子置换
            if (node.left && !node.right) {
                // 和左节点置换
                node = this._swapNode(node, node.left);
            }
            else if (!node.left && node.right) {
                // 和右节点置换
                node = this._swapNode(node, node.right);
            }
            else {
                // 双节点 寻找后继节点
                let _swapNode = this._successor(node);
                node = this._swapNode(node, _swapNode);
            }
            this._onRemove(node);
        }
        return true;
    }
    /**
     * 修复序号
     * @param node
     * @returns
     */
    _onRepairIndex(node) {
        if (!node.parent) {
            return;
        }
        if (node.isLeftChild()) {
            node.parent.index--;
        }
        this._onRepairIndex(node.parent);
    }
    /**
     * 修复节点， 调整平衡
     * @param node
     */
    _onRepairNode(node) {
        if (node.isRoot() || node.isRed()) {
            return;
        }
        let parent = node.parent;
        let brother = node.getBrother();
        if (brother.isBlack()) {
            // 兄弟节点为黑色
            if (node.isLeftChild()) {
                // 左节点
                if (brother.right && !brother.left) {
                    // 只有右节点
                    // 左旋转父节点
                    this._rotateLeft(parent);
                    brother.setColor(parent.color);
                    brother.right.setBlack();
                    parent.setBlack();
                }
                else if (!brother.right && brother.left) {
                    brother.left.setBlack();
                    brother.setRed();
                    this._rotateRight(brother);
                    this._onRepairNode(node);
                }
                else if (brother.left && brother.right) {
                    brother.setColor(parent.color);
                    brother.right.setBlack();
                    parent.setBlack();
                    this._rotateLeft(parent);
                }
                else if (!brother.left && !brother.right) {
                    brother.setRed();
                    this._onRepairNode(parent);
                }
            }
            else {
                // 右节点
                if (brother.left && !brother.right) {
                    brother.setColor(parent.color);
                    brother.left.setBlack();
                    parent.setBlack();
                    this._rotateRight(parent);
                }
                else if (!brother.left && brother.right) {
                    brother.right.setBlack();
                    brother.setRed();
                    this._rotateLeft(brother);
                    this._onRepairNode(node);
                }
                else if (brother.left && brother.right) {
                    brother.setColor(parent.color);
                    brother.left.setBlack();
                    parent.setBlack();
                    this._rotateRight(parent);
                }
                else if (!brother.left && !brother.right) {
                    brother.setRed();
                    this._onRepairNode(parent);
                }
            }
        }
        else {
            // 兄弟节点为红色
            if (node.isLeftChild()) {
                brother.setBlack();
                brother.left.setRed();
                this._rotateLeft(parent);
            }
            else {
                brother.setBlack();
                brother.right.setRed();
                this._rotateRight(parent);
            }
        }
    }
    /**
     * 调整树 使之保持平衡
     * @param node 节点
     */
    _onTuneUp(node) {
        let parent = node.parent;
        if (!parent) {
            // 根节点
            node.setBlack();
            return;
        }
        if (parent.isRed()) {
            let grandparent = parent.parent;
            let uncle = parent.getBrother();
            if (uncle && uncle.isRed()) {
                uncle.setBlack();
                parent.setBlack();
                grandparent.setRed();
                this._onTuneUp(grandparent);
            }
            else if (!uncle || uncle.isBlack()) {
                let tmp = grandparent.parent;
                let isLeft = grandparent.isLeftChild();
                if (parent.isLeftChild() && node.isLeftChild()) {
                    // 左左
                    grandparent.parent = parent;
                    grandparent.left = parent.right;
                    grandparent.index = (parent.right ? parent.right.index : 0) + 1;
                    if (parent.right) {
                        parent.right.parent = grandparent;
                    }
                    grandparent.setRed();
                    parent.right = grandparent;
                    parent.setBlack();
                    if (!tmp) {
                        this._root = parent;
                        parent.parent = null;
                    }
                    else {
                        if (isLeft) {
                            tmp.left = parent;
                        }
                        else {
                            tmp.right = parent;
                        }
                        parent.parent = tmp;
                    }
                }
                else if (parent.isLeftChild() && node.isRightChild()) {
                    // 左右
                    grandparent.left = node;
                    node.parent = grandparent;
                    parent.right = node.left;
                    if (node.left) {
                        node.left.parent = parent;
                    }
                    parent.parent = node;
                    node.left = parent;
                    node.index += parent.index;
                    this._onTuneUp(parent);
                }
                else if (parent.isRightChild() && node.isRightChild()) {
                    // 右右
                    grandparent.parent = parent;
                    grandparent.right = parent.left;
                    if (parent.left) {
                        parent.left.parent = grandparent;
                    }
                    grandparent.setRed();
                    parent.index += grandparent.index;
                    parent.left = grandparent;
                    parent.setBlack();
                    if (!tmp) {
                        parent.parent = null;
                        this._root = parent;
                    }
                    else {
                        if (isLeft) {
                            tmp.left = parent;
                        }
                        else {
                            tmp.right = parent;
                        }
                        parent.parent = tmp;
                    }
                }
                else if (parent.isRightChild() && node.isLeftChild()) {
                    // 右左
                    grandparent.right = node;
                    node.parent = grandparent;
                    parent.left = node.right;
                    if (node.right) {
                        node.right.parent = parent;
                    }
                    parent.parent = node;
                    parent.index -= node.index;
                    node.right = parent;
                    this._onTuneUp(parent);
                }
            }
        }
    }
    /**
     * 寻找后继节点
     * @param node
     */
    _successor(node) {
        if (node == null) {
            return null;
        }
        if (null != node.right) { // 获取 后继节点
            let p = node.right;
            while (null != p.left) {
                p = p.left;
            }
            return p;
        }
        else {
            let p = node.parent;
            let ch = node;
            while (p != null && ch == p.right) {
                ch = p;
                p = p.parent;
            }
            return p;
        }
    }
    /**
     * 左旋转
     * @param node
     */
    _rotateLeft(node) {
        let isLeft = node.isLeftChild();
        let parent = node.parent;
        let right = node.right;
        // 更新index
        right.index += node.index;
        node.right = right.left;
        if (right.left) {
            right.left.parent = node;
        }
        // 链接
        right.left = node;
        node.parent = right;
        right.parent = parent;
        if (parent) {
            if (isLeft) {
                parent.left = right;
            }
            else {
                parent.right = right;
            }
        }
        else {
            this._root = right;
        }
    }
    /**
     * 左旋转
     * @param node
     */
    _rotateRight(node) {
        let isLeft = node.isLeftChild();
        let parent = node.parent;
        let left = node.left;
        // 更新index
        // left.index += node.index;
        node.index = (left.right ? left.right.index : 0) + 1;
        node.left = left.right;
        if (left.right) {
            left.right.parent = node;
        }
        // 链接
        left.right = node;
        node.parent = left;
        left.parent = parent;
        if (parent) {
            if (isLeft) {
                parent.left = left;
            }
            else {
                parent.right = left;
            }
        }
        else {
            this._root = left;
        }
    }
    /**
     * 交换节点位置  简单做法为值交换 这里采用节点交换 (弃用)
     * @param nodeFirst
     * @param nodeSecond
     */
    __swapNode(nodeFirst, nodeSecond) {
        let firstParent = nodeFirst.parent;
        let firstLeft = nodeFirst.left;
        let firstRight = nodeFirst.right;
        let firstIsLeft = nodeFirst.isLeftChild();
        let secondParent = nodeSecond.parent;
        let secondLeft = nodeSecond.left;
        let secondRight = nodeSecond.right;
        let secondIsLeft = nodeSecond.isLeftChild();
        // TODO 交换的节点为父子关系 需要处理
        // 重定向first node
        nodeFirst.parent = secondParent;
        if (secondParent) {
            if (secondIsLeft) {
                secondParent.left = nodeFirst;
            }
            else {
                secondParent.right = nodeFirst;
            }
        }
        nodeFirst.left = secondLeft;
        if (secondLeft) {
            secondLeft.parent = nodeFirst;
        }
        nodeFirst.right = secondRight;
        if (secondRight) {
            secondRight.parent = nodeFirst;
        }
        // 重定向second node
        nodeSecond.parent = firstParent;
        if (firstParent) {
            if (firstIsLeft) {
                firstParent.left = nodeFirst;
            }
            else {
                secondParent.right = nodeFirst;
            }
        }
        nodeSecond.left = firstLeft;
        if (firstLeft) {
            firstLeft.parent = nodeSecond;
        }
        nodeSecond.right = firstRight;
        if (firstRight) {
            firstRight.parent = nodeSecond;
        }
    }
    /**
     * 交换节点位置  简单值交换
     * @param nodeFirst
     * @param nodeSecond
     */
    _swapNode(nodeFirst, nodeSecond) {
        let keyFirst = nodeFirst.key;
        let scoreFirst = nodeFirst.score;
        let keySecond = nodeSecond.key;
        let scoreSecond = nodeSecond.score;
        nodeFirst.key = keySecond;
        nodeFirst.score = scoreSecond;
        nodeSecond.key = keyFirst;
        nodeSecond.score = scoreFirst;
        this._hash.set(nodeFirst.key, nodeFirst);
        this._hash.set(nodeSecond.key, nodeSecond);
        return nodeSecond;
    }
    /**
     * 比较器
     * @param e 当前
     * @param target 目标
     * @returns
     */
    _compare(e, target) {
        return e.score < target.score;
    }
    /**
     * 获取序号
     * @param prev
     * @param node
     * @param index
     * @returns
     */
    _onGetIndex(prev, node, index) {
        if (!prev) {
            return -1;
        }
        if (node == prev) {
            return prev.index + index;
        }
        if (this._compare(node, prev)) {
            return this._onGetIndex(prev.left, node, index);
        }
        else {
            return this._onGetIndex(prev.right, node, index + prev.index);
        }
    }
    /**
     * 寻找指定分数的前驱节点
     * @param prev
     * @param min
     * @returns
     */
    _findScoreStartNode(prev, min) {
        if (!prev) {
            return null;
        }
        if (min <= prev.score) {
            if (!prev.left) {
                return prev;
            }
            else {
                let res = this._findScoreStartNode(prev.left, min);
                if (res) {
                    return res;
                }
                return prev;
            }
        }
        else {
            if (!prev.right) {
                return null;
            }
            else {
                return this._findScoreStartNode(prev.right, min);
            }
        }
    }
    _LDR_selectScoreRange(prev, list, min, max) {
        if (!prev) {
            return;
        }
        if (prev.score < min) {
            this._LDR_selectScoreRange(prev.parent, list, min, max);
            return;
        }
        // 先解决此节点下的问元素
        if (prev.score > max) {
            return;
        }
        list.push([prev.key, prev.score]);
        // 解决右子树
        this._LDR_SCORE(prev.right, list, max);
        this._LDR_selectScoreRange(prev.parent, list, min, max);
    }
    _LDR_SCORE(prev, list, max) {
        if (!prev) {
            return;
        }
        this._LDR_SCORE(prev.left, list, max);
        if (prev.score > max) {
            return;
        }
        list.push([prev.key, prev.score]);
        this._LDR_SCORE(prev.right, list, max);
    }
    _findIndexStartNode(prev, minI) {
        if (!prev) {
            return null;
        }
        if (prev.index == minI) {
            return prev;
        }
        else if (prev.index < minI) {
            minI -= prev.index;
            return this._findIndexStartNode(prev.right, minI);
        }
        return this._findIndexStartNode(prev.left, minI);
    }
    _LDR_selectIndexRange(prev, list, count, prevI, minI, maxI) {
        if (!prev) {
            return;
        }
        // 已经满足筛选
        if (list.length >= count) {
            return;
        }
        let nextPrevI;
        // 计算父节点 prevI
        if (prev.parent) {
            if (prev.isLeftChild()) {
                nextPrevI = prevI + (prev.parent.index - prev.index);
            }
            else {
                nextPrevI = prevI - prev.index;
            }
        }
        if (prevI < minI) {
            if (prev.parent) {
                this._LDR_selectIndexRange(prev.parent, list, count, nextPrevI, minI, maxI);
            }
            return;
        }
        list.push([prev.key, prev.score]);
        // 解决右子树
        this._LDR_INDEX(prev.right, list, count);
        if (prev.parent) {
            this._LDR_selectIndexRange(prev.parent, list, count, nextPrevI, minI, maxI);
        }
    }
    _LDR_INDEX(prev, list, count) {
        if (!prev) {
            return;
        }
        this._LDR_INDEX(prev.left, list, count);
        // 满足筛选
        if (list.length >= count) {
            return;
        }
        list.push([prev.key, prev.score]);
        this._LDR_INDEX(prev.right, list, count);
    }
}
exports.RankTree = RankTree;
//# sourceMappingURL=rank.js.map