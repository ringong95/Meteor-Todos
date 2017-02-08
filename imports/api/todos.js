import { Mongo } from 'meteor/mongo';

export const ToDos = new Mongo.Collection('todos'); 

Meteor.methods({
  'todos.addTodo' (inputValue){
    if((!this.userId)){
      throw new Meteor.error('not-authorized')
    }
     ToDos.insert({
        title: inputValue,
        complete: false,
        owner: this.userId(),
      });
  }
});