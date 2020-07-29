import Konva from 'konva';
import WebGL2DComponent from './WebGL2DComponent';
import TYPES from '../../constants/webGL2DComponentType.json';

let id = 0;

export default class Button extends WebGL2DComponent {
  private readonly rect: Konva.Rect;

  private readonly text: Konva.Text;

  constructor(x: number, y: number) {
    super({ position: { x, y } });
    id += 1;
    this.id = `${TYPES.BUTTON}_${id}`;
    this.type = TYPES.BUTTON;
    // 设置默认文字
    this.text = new Konva.Text({
      text: 'Button',
      fontSize: 12,
      fill: 'white',
      width: 100,
      padding: 10,
      align: 'center',
      verticalAlign: 'center',
    });
    // 根据文字 设置默认矩形
    this.rect = new Konva.Rect({
      width: this.text.width(),
      height: this.text.height(),
      fill: '#FF5370',
      cornerRadius: 2,
      shadowColor: 'blue',
      shadowOpacity: 0.2,
      shadowBlur: 5,
      shadowOffset: { x: 0, y: 0 },
    });
    // 添加
    this.group.add(this.rect);
    this.group.add(this.text);
    // 设置变形事件
    this.group.on('transform', () => {
      this.rect.setAttrs({
        width: this.rect.width() * this.group.scaleX(),
        height: this.rect.height() * this.group.scaleY(),
      });
      this.text.setAttrs({
        width: this.text.width() * this.group.scaleX(),
        height: this.text.height() * this.group.scaleY(),
      });
      this.group.setAttrs({
        scaleX: 1,
        scaleY: 1,
      });
    });
    // 设置按钮组件配置
    this.configComponent({
      id: this.id,
    });
  }
}
