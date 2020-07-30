import Konva from 'konva';

interface WebGL2DComponentCtor {
  position: { x: number; y: number };
  id?: string;
  name?: string;
  type?: string;
}

export default abstract class WebGL2DComponent {
  protected id: string;

  protected name: string;

  protected type: string;

  protected group: Konva.Group;

  protected transformer: Konva.Transformer;

  protected data: any;

  protected children: Map<string, WebGL2DComponent>;

  protected parent: WebGL2DComponent | null;

  protected dom = '';

  protected constructor(props: WebGL2DComponentCtor) {
    const { id, name, type, position } = props;
    this.id = id || '';
    this.name = name || 'component';
    this.type = type || 'component';
    this.data = {
      position,
    };
    this.children = new Map<string, WebGL2DComponent>();
    this.parent = null;

    this.group = new Konva.Group({
      draggable: true,
      name: '$group',
      x: position.x,
      y: position.y,
    });
    this.transformer = new Konva.Transformer({
      node: this.group as any,
      // 暂时不支持组件的旋转
      rotateEnabled: false,
      id: '$transformer',
    });
  }

  protected configComponent(config: Konva.ContainerConfig) {
    this.group.setAttrs({
      id: this.getId(),
      ...config,
    });
  }

  /* 获取组件id */
  getId() {
    return this.id;
  }

  /* 获取组件类型 */
  getType() {
    return this.type;
  }

  /* 获取组件 group */
  getGroup() {
    return this.group;
  }

  /* 获取组件 transformer */
  getTransformer() {
    return this.transformer;
  }

  toDOMString() {
    return `<div data-id="${this.getId()}"></div>`;
  }
}
