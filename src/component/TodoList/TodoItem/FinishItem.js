import React from "react";

import "./FinishItem.css";
let interval;
class FinishItem extends React.Component {
 /*  constructor(props){
    super(props);
    interval = setInterval(()=>{
      console.log("todoItem")
    },1000)
  } */
  render() {
    
    const { id, title,completed } = this.props.todo;
    const { onDelete } = this.props;
    if (completed === true) {
      return (
        <li className="finisheditem">
          <span style={{textDecoration:'line-through'}}>{title}</span>
          <button className="btn btn--delete" onClick={() => onDelete(id)}>
            delete
          </button>
        </li>
      );
    }

    
  }
  componentWillUnmount(){
    clearInterval(interval)
    
  }
}


export default FinishItem;