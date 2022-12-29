import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import FinishItem from "./TodoItem/FinishItem";
import { getTodos, addTodo, removeTodo, completeTodo, editTodo } from "../../apis/TodoApis";

import "./TodoList.css";

class TodoList extends React.Component {
  state = {
    todos: [],
    inputText: "",
  };

  handleInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  handleSubmit = (e) => {
    

    e.preventDefault();
    if (this.state.inputText.trim() === "") {
      return;
    } else {
      const newTodo = {
        title: this.state.inputText,
        completed: false,
        editing: false
      };
      //batching
      addTodo(newTodo).then((todo) => {
        this.setState((prevState) => {
          console.log(this.state.todos.length, prevState.todos.length); //0,0
          return {
            todos: [...prevState.todos, todo],
            inputText: "",
          };
        });
      });
    }
  };

  handleDelete = (id) => {
    removeTodo(id).then(() => {
      this.setState({
        todos: this.state.todos.filter((todo) => id !== todo.id),
      });
    });
  };

  handleCompleted = (id) => {
    completeTodo(id).then(() => {
      this.setState({
        todos: this.state.todos.map((todo) => {
          if (id === todo.id) {
            todo.completed = true;
          }
          return todo;
        })
      })
    })
  }

  handleEdit = (id,content) => {
    let val = this.state.todos.find(item => item.id === id).editing;
    val = !val;
    if (content === undefined) {
      content = this.state.todos.find(item => item.id === id).title;
    }
    console.log("id to edit", id, val, content);
    console.log("before",this.state.todos);
    editTodo(id, val,content).then(() => {
      this.setState({
        todos: this.state.todos.map((todo) => {
          console.log(todo);
          if (id === todo.id) {
            console.log(id);
            todo.editing = val;
            todo.title = content;
          }
          console.log(todo);
          return todo;
        })
      })
    })
    
  }
  shouldComponentUpdate() {
    
    return true;
  }
 

  render() {
    const blank_style = {
      border: 'none',
      listStyleType: 'none',
      padding:'10px'
    };
    console.log("render",this.state.todos);
    return (
      
      <section className="todolist">
        <header className="todolist__header">
          <h4>Todo List</h4>
        </header>
        <form className="todolist__form">
          <input
            type="text"
            className="todolist__input"
            onChange={this.handleInputChange}
            value={this.state.inputText}
          />
          <button className="btn btn--primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        <ul className="todolist__content">
          {this.state.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onComplete={this.handleCompleted} onEditing={this.handleEdit} onDelete={this.handleDelete} />
          ))}
          <li style={blank_style}></li>
          <li style={blank_style}></li>
          {this.state.todos.map((todo) => (
            <FinishItem key={todo.id*100} todo={todo} onDelete={this.handleDelete} />
          ))}
        </ul>
        
      </section>
    );
  }

  componentDidUpdate() {
    /* console.log(
      "cdu",
      this.state.todos.length,
      document.querySelectorAll(".todoitem").length
    ); //2,2 */
  }

  componentDidMount() {
    
    getTodos().then((data) => {
      /* console.log(data); */
      this.setState({
        todos: data,
      });
    });
    //console.log("cdm1",this.state.todos.length, document.querySelectorAll(".todoitem").length); //0,0
  }
}

export default TodoList;
