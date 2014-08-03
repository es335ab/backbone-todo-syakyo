
var routerSpa = routerSpa || {};

(function(){
  'use strict';

  function show(id){
    $('.spaPage').fadeOut();
    $(id).fadeIn();
  };

  var Router = Backbone.Router.extend({
    routes: {
      'page/1': 'page1',
      'page/2': 'page2'
    },

    page1: function(){
      show('#page1');
    },

    page2: function(){
      show('#page2');
    }
  });

  routerSpa.router = new Router();

  Backbone.history.start({pushState: true});

  $('.spaTrigger').click(function(e){
    e.preventDefault();
    routerSpa.router.navigate($(this).attr('href'), {trigger: true});
  });
})();
