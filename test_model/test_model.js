
var modelTest = modelTest || {};

(function(){
  'use strict';

  var Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false
    }
  });

  var TodoCollection = Backbone.Collection.extend({
    model: Todo
  });

  var  todoCollection = new TodoCollection;

  //コレクションの変更監視
  todoCollection.on('add', function(){
    console.log('増えた！');
  });

  todoCollection.on('remove', function(){
    console.log('減った！');
  });

  var a = new Todo({title: 'タイトルA',});
  var b = new Todo({title: 'タイトルB', completed: true});
  var c = new Todo({title: 'タイトルC',});

  var todos = new TodoCollection([a, b]);
  console.log(todos);

  todoCollection.add(c);
  todoCollection.remove(c);

  var items = new Backbone.Collection;
  items.add([ {id: 1, name: 'cat', age: 3}, {id: 2, name: 'cat', age: 10}]);

  items.add([ {id: 1, name: 'bear', age: 3}], {merge: true});
  items.add([ {id: 2, name: 'lion'}]);

  console.log(JSON.stringify(items.toJSON()));

  var TestModel = Backbone.Model.extend({
    defaults: {
      title: 'a',
      completed: false
    }
  });

  var testModel1 = new TestModel({
    aaa: 'hoge'
  });

  var testModel2 = new TestModel({
    aaa: 'hoga'
  });

  var testCollection1 = new Backbone.Collection([testModel1, testModel2]);

  console.log(testCollection1);

  var TodoCollection2 = new Backbone.Collection();

  TodoCollection2.add([
    { id: 0, title: 'go to Jamaica', completed: false },
    { id: 1, title: 'go to China', completed: false },
    { id: 2, title: 'go to Disneyland', completed: true }
  ]);

  var mytodo = TodoCollection2.get(1);
  console.log(mytodo);

  mytodo. set({title: 'go to JAPAN'});

  console.log(TodoCollection2.get(1).get('title'));




})();





