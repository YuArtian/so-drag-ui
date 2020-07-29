export default class Element {
  private type: string;

  constructor(type: string, props: { children: Element[] }) {
    this.type = type;
  }
}
