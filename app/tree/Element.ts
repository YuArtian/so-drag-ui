interface ElementCtor {
  type: string;
  children: Element[];
  code: string;
  styles?: {
    background: string;
    height: string;
    width: string;
  };
  id?: string;
  className?: string;
  name?: string;
}

export default class Element {
  private type: string;

  private children: Element[];

  private code: string;

  constructor(props: ElementCtor) {
    this.type = props.type;
    this.children = props.children || [];
    this.code = props.code;
  }

  /* 判断是否有子组件 */
  hasChildren() {
    return this.children.length !== 0;
  }

  /* 增加子组件 */
  addChildren(component: Element) {
    this.children.push(component);
  }
}
