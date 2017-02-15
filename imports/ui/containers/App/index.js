import React, { Component, PropTypes } from 'react';
import { ToDoCount } from '../../components/TodoCount'
import { ToDos } from '../../../api/todos'
import { createContainer } from 'meteor/react-meteor-data';
import { Todo } from '../../components/Todo'
import { ClearButton } from '../../components/ClearButton'
import AccountsUIWrapper from './../../components/AccountsUiWrapper';
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
    Meteor.call('todos.removedCompleted')
  }

  toggleComplete(item) {
    Meteor.call('todos.toggleComplete', item)
  }

  removeToDo(item) {
    Meteor.call('todos.removeTodo', item._id)
  }

  hasCompleted() {
    let newTodos = this.props.todos.filter((todo) => todo.complete);
    return newTodos.length ? true : false;
  }

  addToDo(event) {
    event.preventDefault();
    if (this.state.inputValue) {
      Meteor.call('todos.addTodo', this.state.inputValue)
      this.setState({
        inputValue: ''
      })
    }
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  render() {
    const { todos, currentUser } = this.props;
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>
        <div className="todo-list">
          <h1> So Much To Do</h1>
          {currentUser ?
            <div>
              <div className="add-todo">
                <ToDoInput
                  addToDo={this.addToDo}
                  value={this.state.inputValue}
                  onChange={this.handleInputChange}
                  autoFocus={true}
                />
              </div>
              <ul>
                {this.props.todos.filter(todo => this.props.currentUserId === todo.owner).map((toDo, index) => {
                  return (
                    <Todo key={toDo._id}
                      toDo={toDo}
                      toggleComplete={this.toggleComplete.bind(this, toDo)}
                      removeToDo={this.removeToDo.bind(this, toDo)} />)
                })}
              </ul>
              <div className="todo-admin">
                <ToDoCount number={this.props.todos.filter(todo => this.props.currentUserId === todo.owner).length} />
                {this.hasCompleted() &&
                  <ClearButton removeCompleted={this.removeCompleted} />
                }
              </div>
            </div>
            :
            <div className="logged-out-message">
              <p> Please sign in to see your todos. </p>
            </div>
          }
        </div>
      </div>
    );
  }
}
App.PropTypes = {
  todos: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  currentUserId: PropTypes.string,
};

App.defaultProps = {
  todos: [],
};

export default createContainer(() => {
  Meteor.subscribe('todos');
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    todos: ToDos.find({}).fetch()
  };
}, App);