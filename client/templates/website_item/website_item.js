Template.website_item.helpers({
		
	// helper shows when the website was added (requirement 5)
	createdOnFormatted: function () {
		var date = this.createdOn;
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		
		if (day < 10)
			day = '0' + day;
		if (month < 10) 
			month = '0' + month;
		return day + "/" + month + "/" + year;
	}
});
	
//--------- website_item template events -------------//
Template.website_item.events({
	
	// users can up vote webpages (requirement 3)
	"click .js-upvote": function (event) {
		var website_id = this._id;
		var website_data = Websites.findOne({ "_id": website_id });
		Meteor.call("updateScoreUp", website_id);
		Session.set("votedWebsiteId", website_id);
		return false; },
		
	// users can down vote webpages (requirement 3)
	"click .js-downvote": function (event) {
		var website_id = this._id;
		var website_data = Websites.findOne({ "_id": website_id });
		Meteor.call("updateScoreDown", website_id);
		return false;
		}
});