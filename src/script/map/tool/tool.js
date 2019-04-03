class Tool{
  constructor(toolName){
    this.fnCollection = {};
    this.init()

    this.name=toolName;
    this.cursor="";

  }
  getName(){
    return this.name;
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
    this.mapboxMap.on('mousemove', this.fnCollection.mouseMove)
    this.mapboxMap.on('mousedown', this.fnCollection.mouseDown)
    this.mapboxMap.on('mouseup', this.fnCollection.mouseUp)
    this.mapboxMap.on('click', this.fnCollection.mouseclick)
  }
  unactive() {
    this.mapboxMap.off('mousemove', this.fnCollection.mouseMove)
    this.mapboxMap.off('mousedown', this.fnCollection.mouseDown)
    this.mapboxMap.off('mouseup', this.fnCollection.mouseUp)
    this.mapboxMap.off('click', this.fnCollection.mouseclick)
  }
}

export default Tool;