import React, { Component } from 'react'
import { Collapse, Input } from 'antd';
import EditIcon from '@/assets/svgIcon/edit.svg';
import DeleteIcon from '@/assets/svgIcon/delete.svg';
import DownIcon from '@/assets/svgIcon/down.svg';

import DragTable from './DragTable'

const Panel = Collapse.Panel;

const TitleElement = (props) =>{
  const click = event=>{
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
  }
  return (
    <div className="flex-between">
      <Input className="collapse-input" value={props.item.title} onClick={click} onChange={(event)=>props.changeTitle(event,props.item)} />
      <div className="width-60 flex-center">{props.item.id}/5</div>
      <div className="width-60 flex-center">{(Math.floor(Math.random()*10000)/100)+'%'}</div>
      <img className="pointer" width="17" height="17" src={EditIcon} alt=""/>
      <img className="pointer" width="17" height="17" src={DeleteIcon} alt=""/>
      <img className="pointer" width="20" height="20" src={DownIcon} alt=""/>
    </div>
  )
}


let lists = [{id:1,title:'AOI1'},{id:2,title:'AOI2'},{id:3,title:'AOI3'},{id:4,title:'AOI4'},{id:5,title:'AOI5'}]

export default class ContentCollapse extends Component {
  state = {
    lists
  }
  changeTitle(event,item){
    item.title = event.target.value;
    this.setState({
      lists:this.state.lists
    })
  }
  render() {
    return (
      <div className="content-collapse">
        <Collapse bordered={false} accordion>
          {
            lists.map(item=>(
              <Panel showArrow={false} header={<TitleElement item={item} changeTitle={this.changeTitle.bind(this)} />} key={item.id}>
                <DragTable />
              </Panel>
            ))
          }
        </Collapse>
      </div>
    )
  }
}