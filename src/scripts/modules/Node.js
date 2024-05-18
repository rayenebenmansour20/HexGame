class Node {
    constructor() {
        this.children = [];
        this.value = null;
        this.type = null;
        this.parent = null;
    }

    getNodeNumber() {
        return this.children.length;
    }

    isLeaf() {
        return this.children.length === 0;
    }

    getType() {
        return this.type;
    }

    getChildren() {
        return this.children;
    }

    getChild(index) {
        return this.children[index];
    }

    addChild(child) {
        this.children.push(child);
        child.setParent(this);
    }

    setType(nodeType) {
        this.type = nodeType;
    }

    setValue(nodeValue) {
        this.value = nodeValue;
    }

    getValue() {
        return this.value;
    }

    setParent(parent) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }
}
export default Node;