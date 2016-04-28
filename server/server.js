/**
 * @author paula
 */

Meteor.startup(function () {
		Meteor.methods({
			getDetails: function (url) {
				if (!Meteor.userId()) {
					throw new Meteor.Error('not-authorized');
				}
				var result = HTTP.get(url);
				return result;
			},
			
			insertWebsite: function (doc) {
				if (!Meteor.userId()) {
					throw new Meteor.Error('not-authorized');
				}
				Websites.insert(doc);
			},
			
			insertComment: function (website_id, comment) {
				if (!Meteor.userId()) {
					throw new Meteor.Error('not-authorized');
				}
				Websites.update({ "_id": website_id }, { $push: { 'comments': comment } });
			},
			
			updateScoreUp: function (website_id) {
				Websites.update({ "_id": website_id }, { $inc: { scoreUp: 1 } });
			},
			
			updateScoreDown: function (website_id) {
				Websites.update({ "_id": website_id }, { $inc: { scoreDown: -1 } });
			},
              
      /* ---------------- MiniMongo LIMITATION !!!! hints that Meteor is not as mature */
      /* ---------------- $text is not supported on client side -------------- */
      /* ---------------- BRRR        UGLY  ---------------------------------- */
      /* ---------------- especially when a multipe subscription to the ------ */
      /* ---------------- same collection is NOT POSSIBLE -------------------- */
      /* ---------------- and this aspect is evasive explained in the -------- */
      /* ---------------- METEOR doc ------------------ */         
      
		}); 
                                                                   
	Websites._ensureIndex({
		"title": "text",
		"description": "text"
	});                                           
    
    Meteor.publish('getDoc', function (website_id) {
    	return Websites.find({ _id: website_id });
    });
    
    Meteor.publish("search", function (searchValue) {
    	if (!searchValue) {
    		return Websites.find({});
    	}
    	
    	var result = Websites.find({ $text: { $search: searchValue } });
    	return result;
    });
    
    Meteor.publish('websites', function () {
    	return Websites.find();
    });
                                                    
    // code to run on server at startup                             
    if (!Websites.findOne()) {                                        
      console.log("No websites yet. Creating starter data.");       
                                                                       
      Websites.insert({ title: "Goldsmiths Computing Department",    
        url: "http://www.gold.ac.uk/computing/",                       
        description: "This is where this course was developed.",       
        createdOn: new Date(),                                        
        scoreUp: 0,                                                    
        scoreDown: 0,                                               
        comments: new Array()                                        
      });                                                              
      Websites.insert({                                                
        title: "University of London",                                 
        url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
        description: "University of London International Programme.",  
        createdOn: new Date(),                                        
        scoreUp: 0,                                                    
        scoreDown: 0,                                                  
        comments: new Array()                                          
      });                                                             
      Websites.insert({                                                
        title: "Coursera",                                             
        url: "	",                                                      
        description: "Universal access to the world’s best education.",
        createdOn: new Date(),                                         
        scoreUp: 0,                                                    
        scoreDown: 0,                                                  
        comments: new Array()                                          
      });                                                              
      Websites.insert({                                               
        title: "Google",                                               
        url: "http://www.google.com",                                  
        description: "Popular search engine.",                        
        createdOn: new Date(),                                         
        scoreUp: 0,                                                    
        scoreDown: 0,                                                  
        comments: new Array()                                          
      });                                                             
    }                                                                  
  });               