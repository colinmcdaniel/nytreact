// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Geocoder API
var authKey = "352b51db3b1546a5af254d3c1eba815b";

// var queryTerm 	= "";
// var startYear 	= 0;
// var endYear		= 0;

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the query to geolocate. 
	runQuery: function(term, startYear, endYear){

		console.log("term");
		console.log(term);
		console.log("startYear:");
		console.log(startYear);
		console.log("endYear:");
		console.log(endYear);

		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + term + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231";

		return axios.get(queryURL)
			.then(function(queryResponse){

				console.log(queryResponse);

				var resultsArr = [];
				for(var i=0;i<5;i++){
					resultsArr.push({"title": queryResponse.data.response.docs[i].headline.main, "date": queryResponse.data.response.docs[i].pub_date, "url": queryResponse.data.response.docs[i].web_url});
				}

				return resultsArr;
		})

	},

	// This function hits our own server to retrieve the record of query results
	getHistory: function(){

		return axios.get('/api/saved')
			.then(function(response){

				console.log("/api/saved response:");
				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postHistory: function(title, date, url){

		return axios.post('/api/saved', {title: title, date: date, url: url})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}


// We export the helpers function 
module.exports = helpers;
