
    var Info = Backbone.Model.extend({
      urlRoot: 'api/contacts',
      initialize: function() {
        this.on('invalid', function(model, error) {
          alert(error);
          return false;
        });
      },
      validate: function(attrs, options) {
        if(isNaN(attrs.age)) {
          return "age is a number";
        }
        if(attrs.username.length < 2) {
          return "username is longer than 1 char";
        }
      }
    });
    var InfoList = Backbone.Collection.extend({
      model: Info,
      url: 'api/contacts'
    });

    var Infos = new InfoList(); 
    
    var ItemView = Backbone.View.extend({
      tagName: 'tr',
      template: _.template($('#itemTemplate').html()),
      events: {
        'dblclick td': 'edit',
        'blur input,select': 'close',
        'click .del': "clear"
      },
      initialize: function() {
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
      },
      setText: function() {
        var model = this.model;
        this.input = $(this.el).find('input,select');
        this.input.each(function() {
          var input = $(this);
          input.val(model.get(input.attr("name")));
        });
      },
      close: function(e) {
        var input = $(e.currentTarget);
        var obj = {};
        obj[input.attr('name')] = input.val();
        console.log(input.attr('name'))
        this.model.save(obj);
        //$(e.currentTarget).parent().css('display', 'none');
        $(e.currentTarget).find('.edit').css('display','none');
        $(e.currentTarget).find('.display').css('display','block');
      },
      edit: function(e) {
        $(e.currentTarget).find('.display').css('display','none');
        $(e.currentTarget).find('.edit').css('display','block');
        $(e.currentTarget).find('input,select').focus(); 
      },
      render: function() {  
        $(this.el).html(this.template(this.model.toJSON()));
        this.setText();  
        return this;  
      },  
      remove: function() {  
        $(this.el).remove();  
      },  
      clear: function() {  
         this.model.destroy({
          success: function(model, response) {
            alert('ok');
          }
        });  
      }  
    });
    
    window.AppView = Backbone.View.extend({
      el: $('body'),
      events: {
        'click #add': 'addItem',
        'click #addOk': 'createOnBlur'
      },
      initialize: function() {
        Infos.bind('add', this.addOne, this);
        Infos.bind('reset', this.addAll, this);
        Infos.fetch();
      },
      addItem: function(e) {
        $('#addItem').css('display', 'block');
        $('#add').css('display', 'none');
      },
      createOnBlur: function(e) {
        var info = new Info();  
        var attr = {};  
        $('#addItem input,#addItem select').each(function(){  
          var input = $(this);  
          attr[input.attr('name')] = input.val();  
        });  
        $('#addItem').css('display', 'none');
        $('#add').css('display', 'block');
        info.save(attr, {
          error: function(model,error){
            alert(error);
          },
          success:function(){
            Infos.create(info); 
          }
        });
      },
      addOne : function(info){  
        info.set({"id":info.get("username")})
        info.bind('error',function(model,error){  
          alert(error);  
        });  
        var view = new ItemView({model:info});  
        $(".info-table tbody").append(view.render().el);  
      },  
      addAll : function(){  
        Infos.each(this.addOne);  
      }  
    });
    window.App = new AppView();  