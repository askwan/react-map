class Tool{
  constructor(){
    this.fnCollection = {};
    this.init()
  }
  init(){
    this.fnCollection.mouseMove = this.mouseMove.bind(this);
    this.fnCollection.mouseDown = this.mouseDown.bind(this);
    this.fnCollection.mouseUp = this.mouseUp.bind(this);
    this.fnCollection.mouseclick = this.mouseclick.bind(this);
  }

  mouseMove(event) {}
  mouseDown(event) {}
  mouseUp(event) {}
  mouseclick(event) {}
  mouseDBclick(event) {}
  active() {
    this.map.on('mousemove', this.fnCollection.mouseMove)
    this.map.on('mousedown', this.fnCollection.mouseDown)
    this.map.on('mouseup', this.fnCollection.mouseUp)
    this.map.on('click', this.fnCollection.mouseclick)
  }
  unactive() {
    this.map.off('mousemove', this.fnCollection.mouseMove)
    this.map.off('mousedown', this.fnCollection.mouseDown)
    this.map.off('mouseup', this.fnCollection.mouseUp)
    this.map.off('click', this.fnCollection.mouseclick)
  }
}

export default Tool;