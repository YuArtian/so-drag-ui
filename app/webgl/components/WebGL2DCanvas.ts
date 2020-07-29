import Konva from 'konva';
import WebGL2DComponent from './WebGL2DComponent';
import Tree from '../../tree/Tree';

export default class WebGL2DCanvas {
  private readonly stage: Konva.Stage;

  private readonly layer: Konva.Layer;

  private readonly tree: Tree;

  constructor(container: HTMLElement, type = 'IP6') {
    this.stage = new Konva.Stage({
      container: container.id,
      width: 375,
      height: 667,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    // 初始化组件树
    this.tree = new Tree();
  }

  /* 添加组件到当前画布 */
  appendComponentToLayer(component: WebGL2DComponent) {
    this.layer.add(component.getGroup());
    this.layer.add(component.getTransformer());
  }

  /* 增加组件 */
  addComponent(component: WebGL2DComponent) {
    // 添加到画布
    this.appendComponentToLayer(component);
    // 添加到当前组件树
    // this.tree
    // 重新渲染
    this.render();
  }

  /* 渲染 */
  render() {
    this.layer.draw();
  }

  /* 转换为 JSON 对象 */
  toJSON() {}
}
