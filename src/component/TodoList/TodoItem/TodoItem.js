import React from "react";

import "./TodoItem.css";
let interval;
class TodoItem extends React.Component {

  state = {
    InputText:"",
  }
  handleInputChange = (e) => {
    console.log("???");
    console.log(e);
    this.setState({
      InputText: e.target.value,
    });
  };
  render() {
    const { id, title,completed,editing } = this.props.todo;
    const { onComplete, onEditing, onDelete } = this.props;
    if (completed === false) {
      if (editing === false) {
        return (
          <li className="todoitem">
            <span onClick={() => onComplete(id)}>{title}</span>
            <button className="btn btn--editing" onClick={() => onEditing(id)}>
              edit
            </button>
            <button className="btn btn--delete" onClick={() => onDelete(id)}>
              delete
            </button>
          </li>
        );
      }
      else {
        return (
          <li className="todoitem">
            <input type="text"
              value={this.state.InputText}
              onChange={this.handleInputChange}
            ></input>
            <button className="btn btn--editing" onClick={() => onEditing(id,this.state.InputText)}>
              edit
            </button>
            <button className="btn btn--delete" onClick={() => onDelete(id)}>
              delete
            </button>
          </li>
        );
      }
    }

    
  }
  componentWillUnmount(){
    clearInterval(interval)
    /* console.log("cwu") */
  }
}
// id, title, completed, delete button

export default TodoItem;
