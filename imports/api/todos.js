import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

export const ToDos = new Mongo.Collection('todos');

if (Meteor.isServer) {
  Meteor.publish('todos', function todosPublication() {
    return ToDos.find({ owner: this.userId })
  });

}

Meteor.methods({
  'todos.addTodo'(inputValue) {
    if ((!this.userId)) {
      throw new Meteor.error('not-authorized')
    }
     new SimpleSchema({
      inputValue: { type: String },
    }).validate({ inputValue });
    ToDos.insert({
      title: inputValue,
      complete: false,
      owner: this.userId,
    });
  },
  'todos.toggleComplete'(item) {
    if ((!this.userId)) {
      throw new Meteor.error('not-authorized')
    }
    check(todo._id, String);
    
    ToDos.update(item._id, { $set: { complete: !item.complete } })
  },
  'todos.removeTodo'(id) {
    if ((!this.userId)) {
      throw new Meteor.error('not-authorized')
    }
    ToDos.remove(id)
  },
  'todos.removedCompleted'() {
    if ((!this.userId)) {
      throw new Meteor.error('not-authorized')
    }
    ToDos.remove({ owner: this.userId, complete: true })
  }
});