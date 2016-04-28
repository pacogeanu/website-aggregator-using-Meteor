
Template.website_form.events({
	
	// users can post new websites if they are logged in (requirement 2)
	"click .js-toggle-website-form": function (event) {
		if (!Meteor.userId()) {
			alert("Users can post new websites if they are logged in");
		} else {
			$("#website_form").toggle('slow');
		}},
		
	// challenge 1: Automatic information - user does not need to enter anything other than the URL
	"submit .js-save-website-form": function (event) {
		// get url
		var url = event.target.url.value;
		var result = Meteor.call("getDetails", url, function (error, result) {
		
    		// parse the string into an array of DOM nodes.
    		var domNodes = $.parseHTML(result.content);
    		var title, description;
    		
    		var title_node = $(domNodes).filter("title");                 
			if (title_node.html().length === 0) {
				title_node = $(domNodes).filter("meta[property='og:title']");
				title = title_node.attr("content");                          
			} else {
				title = title_node.html();
			}
			
			var description_node = $(domNodes).filter("meta[name='Description']");
			if (description_node.attr("content") === undefined) {
				description_node = $(domNodes).filter("meta[name='description']");
				if (description_node.attr("content") === undefined) {
					description_node = $(domNodes).filter("meta[property='og:description']");
				}
			}                                                              
                                                                      
	        if (description_node.attr("content") === undefined || description_node.attr("content").length === 0)
				description = "Description not found or empty";else description = description_node.attr("content");
                                                                      
	        // get creationDate                                            
	        var creationDate = new Date();                                 
                                                                       
	        // insert a new doc                                           
	        Meteor.call('insertWebsite', {                                 
	          title: title,                                               
	          url: url,                                                   
	          description: description,                                    
	          createdOn: new Date(),                                       
	          scoreUp: 0,                                                  
	          scoreDown: 0                                                 
	        });                                                            
  		});                                                             
  	$("#website_form").toggle('slow');                            
  	// stop the form submit from reloading the page             
  	return false;                                               
	} // end event handle                                                            
});