import {serverUrl} from './config'
import ImageServer from './api/ImageServer'


class Server {
  constructor(option={}){
    this.init(option)
  }
  init(option){
    this.url = option.url || serverUrl;
    this.imageServer = new ImageServer({url:this.url});
  }
}

export default new Server()