import Element from './Element';
import WebGL2DComponent from '../webgl/components/WebGL2DComponent';

export default class Tree {
  private root: Element | null;

  constructor() {
    this.root = new Element({ type: 'root', children: [], code: '' });
  }

  /* 获取根节点 */
  getRoot() {
    return this.root;
  }

  /* 添加 element */
  appendElement(component: WebGL2DComponent) {
    const element = Tree.toElement(component);

    this.root?.addChildren(element);
  }

  /* 将 WebGLComponent转换为 Element */
  static toElement(component: WebGL2DComponent) {
    // 获取类型
    const type = component.getType();
    const code = component.toDOMString();
    console.log('code', code);
    return new Element({ type, children: [], code });
  }

  /* 将组件树输出为 JSON */
  toJSON() {
    console.log('tree json', this.root);

    return this.root;
  }
}
