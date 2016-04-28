// ------------- routing ------------ //
Router.route('/', function () {
	this.layout('MainLayout');
	this.render('navbar', { to: 'navbar' });
	this.render('website_form', { to: 'website_form' });
	this.render('website_list', { to: 'website_list' });
	this.render('website_recommender', { to: 'website_recommender' });},{
	// ----------- Meteor doc is evasive, a failure ------------- //
	subscriptions:function() {                                        
		Meteor.subscribe('websites');}                                                                
});

Router.route('/detail/:_id', function () {
	this.layout('OtherLayout'); 
	var website_id = this.params._id;
	this.render('detail_page', { data: function () {                 
    	Meteor.subscribe("getDoc", website_id);                       
    	return Websites.findOne({ "_id": website_id });              
  	}});
});

Router.route('/search', function () {
	this.layout('OtherLayout');
	this.render('search_page');
	}, {
		name: 'search_page'});