// challenge 2: Search function
// defined a new route, a new page to render: search_page
Template.search_page.helpers({
	
	messages: function () {
		Meteor.subscribe("search", Session.get("searchValue"));
		if (Session.get("searchValue")) {
			if (Websites.find({}).fetch().length == 0) {
				return null;
			}
			// $text not implemented in minimongo ??!!!
			// this can be solved only with a HACK
			// instead of using publish a method is required -> UGLY !!!
    		return Websites.find({});
    }},
    
    currentSearchValue: function () {
    	return Session.get("searchValue");
    }
});

Template.search_page.events({
	
	"click #searchBtn": function () {
		document.location.reload(true);
		delete Session.keys['searchValue'];
	},
	
	"click .btn.btn-default": function (e) {
		e.preventDefault();
		Session.set("searchValue", $("input").val());
	}
});                                                      
          