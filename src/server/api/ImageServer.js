import Base from "./Base";
import {MetaData} from '../model'
class ImageServer extends Base {
  constructor(option){
    super();
    this.url = option.url+'/metadata';
    console.log(this.url,77777777)
  }
  queryByArea(option={}){
    return new Promise((resolve,reject)=>{
      option.geoWkt = 'POLYGON((110.334 44.3182,110.766 44.2411,110.654 43.9166,110.224 43.9934,110.334 44.3182))';
      this.get('/query',option).then(res=>{
        if(res.status===200){
          
          resolve(new MetaData(res.data));
        }else{
          reject(res);
        }
      })
      .catch(err=>reject(err));
    })
  }

}


export default ImageServer;