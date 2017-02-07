import React, { Component, PropTypes } from 'react';
import { ToDoCount } from '../../components/TodoCount'
import { ToDos } from '../../../api/todos'
import { createContainer } from 'meteor/react-meteor-data';
import { Todo } from '../../components/Todo'
import { ClearButton } from '../../components/ClearButton'
import ToDoInput from '../../components/ToDoInput'
import './styles.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    }
    this.removeCompleted = this.removeCompleted.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  removeCompleted() {
    this.props.todos.forEach((todo) => {
      if (todo.complete) {
        ToDos.remove(todo._id)
      }
    })
  }

  toggleComplete(item) {
    ToDos.update(item._id, { title: item.title, complete: !item.complete })
  }

  removeToDo(item) {
    ToDos.remove(item._id)
  }

  hasCompleted() {
    let newTodos = this.props.todos.filter((todo) => todo.complete);
    return newTodos.length ? true : false;
  }

  addToDo(event) {
    event.preventDefault();
    if (this.state.inputValue) {
      ToDos.insert({
        title: this.state.inputValue,
        complete: false
      });
      this.setState({
        inputValue: ''
      })
    }
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  render() {
    const { todos } = this.props;
    return (
      <div className="todo-list">
        <h1> So Much To Do</h1>
        <div className="add-todo">
          <ToDoInput
            addToDo={this.addToDo}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            autoFocus={true}
          />
        </div>
        <ul>

          {this.props.todos.map((toDo, index) => {
            return (
              <Todo key={toDo._id}
                toDo={toDo}
                toggleComplete={this.toggleComplete.bind(this, toDo)}
                removeToDo={this.removeToDo.bind(this, toDo)} />)
          })}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={todos.length} />
          {this.hasCompleted() &&
            <ClearButton removeCompleted={this.removeCompleted} />
          }
        </div>
      </div>
    );
  }
}
App.PropTypes = {
  todos: PropTypes.array.isRequired,
};

App.defaultProps = {
  todos: [],
};

export default createContainer(() => {
  return {
    todos: ToDos.find({}).fetch()
  };
}, App);