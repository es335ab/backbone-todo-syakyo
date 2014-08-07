
var eventTest = eventTest || {};

(function(){
  'use strict';

  //Model
  var Todo = Backbone.Model.extend({
    defaults: {
      id: 0,
      title: '',
      completed: true
    }
  });

  eventTest.todo = new Todo;

  //Collection
  eventTest.todoCollection = new Backbone.Collection();

  eventTest.todoCollection.on('add', function(){
    console.log('I should ' + eventTest.todo.get('title') + '". Have I done it before? ' + (eventTest.todo.get('completed') ? 'Yeah': 'No.'));
  });

  eventTest.todoCollection.on('remove', function(){
    console.log('消えた');
  });

  eventTest.todoCollection.add([
    { id: 0, title: 'go to Jamaica', completed: false },
    { id: 1, title: 'go to China', completed: false },
    { id: 2, title: 'go to Disneyland', completed: true }
  ]);

 eventTest.todoCollection.remove({id : 1});

})();

console.log(eventTest.todoCollection);　



