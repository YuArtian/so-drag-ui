import Element from './Element';

export default class Tree {
  private root: Element | null;

  constructor() {
    this.root = new Element('root', { children: [] });
  }

  /* 获取根节点 */
  getRoot() {
    return this.root;
  }
  /* 添加 element */
}
