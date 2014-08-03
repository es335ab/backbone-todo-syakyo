
var routerTest = routerTest || {};

(function(){
  'use strict';

  var Todo = Backbone.Model.extend({
    completed: function(){
      return this.get('completed');
    }
  });

  var Todos = Backbone.Collection.extend({
    model: Todo
  });

  var TodoList = Backbone.View.extend({
    initialize: function(){
      this.collection.on('add', this.add, this);
    },

    add: function(model){
      var item = new TodoListItem({model: model});

      this.$el.append(item.el);
    },

    showAll: function(){
      var $li = this.$('li').show();
    },

    showActive: function(){
      var $li = this.$('li').hide();
      $li.not('.completed').show();
    },

    showCompleted: function(){
      var $li = this.$('li').hide();
      $li.filter('.completed').show();
    }
  });

  var TodoListItem = Backbone.View.extend({
    tagName: 'li',

    render: function(){
      this.$el.text(this.model.get('text'));
      if(this.model.completed()){
        this.$el.addClass('completed');
      }
    },

    initialize: function(){
      this.render();
    }
  });

  var TodoRouter = Backbone.Router.extend({
    initialize: function(){
      this.todos = new Todos();
      this.listView = new TodoList({
        el: '.todoList',
        collection: this.todos
      });
    },

    routes: {
      'active': 'active',
      'completed': 'completed',
      '*all': 'all'
    },

    all: function(){
      this.listView.showAll();
    },

    active: function(){
      this.listView.showActive();
    },

    completed: function(){
      this.listView.showCompleted();
    }

  });

  routerTest.router = new TodoRouter();

  routerTest.router.todos.add([
    { text: 'やること1' },
    { text: 'やること2', completed: true },
    { text: 'やること3', completed: true },
    { text: 'やること4' },
    { text: 'やること5' },
    { text: 'やること6', completed: true },
    { text: 'やること7', completed: true },
    { text: 'やること8' },
    { text: 'やること9' },
    { text: 'やること10', completed: true }
  ]);

  Backbone.history.start();


})();
