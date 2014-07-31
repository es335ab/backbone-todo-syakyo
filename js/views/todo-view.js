var app = app || {};

(function($){
  'use strict';

  app.TodoView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#item-template').html()),

    events: {
      'click .toggle': 'toggleCompleted',
      'dbclick label': 'edit',
      'click .destroy': 'clear',
      'keypress .edit': 'updateOnEnter',
      'keydown .edit': 'revertOnEscape',
      'blur .edit': 'close'
    },

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    render: function(){
      if(this.model.changed.id !== undefined){
        return;
      }

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('', this.model.get('completed'));
      this.toggleVisible();
      this.$input = this.$('.edit');
      return this;
    },

    toggleVisible: function(){
      this.$el.toggleClass('hidden', this.isHidden());
    },

    isHidden: function(){
      var isCompleted = this.model.get('completed');
      return (
        (!isCompleted && app.TodoFilter === 'completed') ||
        (isCompleted && app.TodoFilter === 'active')
      );

    },

    toggleCompleted: function(){
      this.model.toggle();
    },

    edit: function(){
      this.$el.addClass('editing');
      this.$input.focus();
    },

    close: function(){
      var value = this.$input.val();
      var trimmedValue = value.trim();

      if(!this.$el.hasClass('editing')){
        return;
      }

      if(trimmedValue){
        this.model.save({title: trimmedValue});

        if(value !== trimmedValue){
          this.model.trigger('change');
        }
      }else{
        this.clear();
      }

      this.$el.removeClass('editing');
    },

    updateOnEnter: function(e){
      if(e.which === ESC_KEY){
        this.$el.removeClass('editing');
        this.$input.val(this.model.get('title'));
      }
    },

    clear: function(){
      this.model.destroy();
    }
  });
})(jQuery);















