Template.website_list.helpers({
		
	// websites should be listed with the most up voted site first (requirement 4)
	websites: function () {
		return Websites.find({}, { sort: { scoreUp: -1, date: -1 }, limit: 10 });
	}
});