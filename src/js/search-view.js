App.SearchView = Backbone.View.extend({
	el: '.top-bar',
	template: ' \
		<div class="col-xs-10">\
            <div class="search-group has-feedback">\
                <i class="glyphicon glyphicon-search form-control-feedback"></i>\
                <input type="search" class="form-control searching" placeholder="Search..."></input>\
            </div>\
        </div>\
        <button class="btn btn-default" type="button">\
            <span class="glyphicon glyphicon-plus"></span>\
        </button>\
		',
	events: {
		'click button': 'addContact',
		"keyup .searching" : "searchList",
	},
	initialize: function () {
		this.render();
	},
	render: function () {
		$(this.el).html(this.template);
	},
	addContact: function () {
		if(!editing) {
			this.collection.trigger('addContact');
			
			if(isMobile) {
				this.collection.trigger('showViewport');
			}
		}
	},
	searchList: function (e) {
		this.collection.trigger('searched');
	}
});