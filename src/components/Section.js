export default class Section{
  constructor(renderer, container) {
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._container.append(this._renderer(item))
    })
  }

  addItem(item){
    this._container.prepend(this._renderer(item))
  }
}