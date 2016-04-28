// on the detail page, users can post comments about a webpage (requirement 7)
// added a new route, new page: detail_page
Template.detail_page.helpers({
	commentslist: function () {
		Meteor.subscribe("getDoc", this._id);
		var result = Websites.findOne({ _id: this._id });
		return result;
	}
});

Template.detail_page.events({
	"click .js-toggle-comment-form": function (event) {
		if (!Meteor.userId()) {
			alert("You are not logged in !");
		} else {
			$("#comment_form").toggle('slow');
		}
	},
	
	"submit .js-save-comment-form": function (event) {
		var website_id = this._id;
		// post a new comment, call insertComment method
		// defined on server side
		Meteor.call("insertComment", website_id, { comment: event.target.message.value, postedOn: new Date(), postedBy: Meteor.user().username });                                                         
  		$("#comment_form").toggle(); 
  		$("#message").val("");
  		return false;
  		} 
}); 