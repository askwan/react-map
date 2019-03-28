import React, { Component } from 'react';
import ploygon from '@/assets/svgIcon/polygon.svg';
import reatIcon from '@/assets/svgIcon/react.svg';
import earthIcon from '@/assets/svgIcon/earth.svg';
import uploadIcon from '@/assets/svgIcon/upload.svg';
import importIcon from '@/assets/svgIcon/import.svg';
import searchIdIcon from '@/assets/svgIcon/searchId.svg';
import deleteIcon from '@/assets/svgIcon/delete.svg'

const operateList = [{
  icon: ploygon,
  des: '绘制一个多边形'
},
{
  icon: reatIcon,
   des: '绘制一个长方形'
},
{
  icon: earthIcon, 
  des: '创建一个点'
},
{
  icon: uploadIcon,
  des:'上传数据',
},{
  icon: importIcon,
  des:'导入临时数据'
},{
  icon:searchIdIcon,
  des:'按照id查找一个位置'
},{
  icon:deleteIcon,
  des:'删除数据'
}];

const OperateElement = (props)=>{
  let selected = props.selected;
  let className = "no-select radius-2 flex-align pointer pd-small font-18 font-black area-el";
  return (
    operateList.map((item,i)=>(
      <div key={i} className={item.icon === selected ? className + ' active' : className} onClick={()=>props.selectOperate(item)}>
        <img className="mg-right-small" width="18" height="18" src={item.icon} alt="" />
        <span>{item.des}</span>
      </div>
    ))
  )
}

export default class Area extends Component {
  state = {
    selected:''
  }
  selectOperate(item){
    this.setState({
      selected:item.icon
    })
  }
  render() {
    return (
      <div className="header-area page-tab pd-big">
        <OperateElement selectOperate={this.selectOperate.bind(this)} selected={this.state.selected}></OperateElement>
      </div>
    )
  }
}
