import React from 'react';
import {DragDropContext,DragSource,DropTarget} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Table } from 'antd';
import AddIcon from '@/assets/svgIcon/add.svg'

let dragingIndex = -1;

class BodyRow extends React.Component {
  render(){
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;

    const style = {...restProps.style,cursor:'move'};

    let className = restProps.className;

    if(isOver){
      if(restProps.index>dragingIndex){
        className += ' drop-over-downward';
      }
      if(restProps.index<dragingIndex){
        className += 'drop-over-upward';
      }
    }
    return connectDragSource(
      connectDropTarget(
        <tr 
          {...restProps}
          className = {className}
          style={style}
        />
      )
    )

  }
}

const rowSource = {
  beginDrag(props){
    dragingIndex = props.index;
    return {
      index:props.index
    }
  }
}

const rowTarget = {
  drop(props,monitor){
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if(dragIndex === hoverIndex){
      return;
    }
    props.moveRow(dragIndex,hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
}

const DragableBodyRow = DropTarget(
  'row',
  rowTarget,
  (connect,monitor)=>({
    connectDropTarget:connect.dropTarget(),
    isOver:monitor.isOver(),
  }),
)(
  DragSource(
    'row',
    rowSource,
    (connect)=>({
      connectDragSource:connect.dragSource(),
    }),
  )(BodyRow),
)

const columns = [{
  title:'Source',
  dataIndex:'source',
  key:'source',
  className:'column column-1'
},{
  title:'Collected',
  dataIndex:'date',
  key:'date',
  className:'column column-2'
},{
  title:'Area Clouds',
  dataIndex:'cloud',
  key:'cloud',
  className:'column column-3'
},{
  title:'Area Off Nadir',
  dataIndex:'area',
  key:'area',
  className:'column column-4'
},{
  title:'',
  dataIndex:'add',
  key:'add',
  className:'column column-5',
  render:(text,record)=>(
    <img width="17" height="17" src={AddIcon} alt="" />
  )
}];




class DragSortingTable extends React.Component {
  state = {
    data:[{
      key:'1',
      source:'GE01',
      date:'2017-04-26',
      cloud:'0.1%',
      area:'16.9%'
    },{
      key:'2',
      source:'WV02',
      date:'2019-02-01',
      cloud:'10%',
      area:'17.0'
    },{
      key:'3',
      source:'WV02',
      date:'2017-06-18',
      cloud:'11%',
      area:'26.1%'
    },{
      key:'4',
      source:'WV03',
      date:'2018-11-08',
      cloud:'5%',
      area:'27.3%'
    },{
      key:'5',
      source:'WV04',
      date:'2018-12-12',
      cloud:'6%',
      area:'19.5%'
    }]
  }
  components = {
    body:{
      row:DragableBodyRow
    }
  }
  moveRow = (dragIndex,hoverIndex)=>{
    const {data} = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state,{
        data:{
          $splice:[[dragIndex,1],[hoverIndex,0,dragRow]],
        },
      }),
    );
  }
  render(){
    return (
      <Table
        columns={columns}
        size='small'
        rowSelection = {{}}
        dataSource={this.state.data}
        components = {this.components}
        pagination={false}
        onRow = {(record,index)=>({
          index,
          moveRow:this.moveRow,
        })}
      />
    )
  }
}

export default DragDropContext(HTML5Backend)(DragSortingTable);