// Include React 
var React = require('react');

// Here we include all of the sub-components
var Saved = require('./Children/Saved');
var Results = require('./Children/Results');
var Search = require('./Children/Search');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			searchTerm: "",
			searchStartYear: 0,
			searchEndYear: 0,
			results: [
				{"title": "", "date": "", "url": ""},
				{"title": "", "date": "", "url": ""},
				{"title": "", "date": "", "url": ""},
				{"title": "", "date": "", "url": ""},
				{"title": "", "date": "", "url": ""}
			],
			history: [] /*Note how we added in this history state variable*/
		}
	},	

	// This function allows childrens to update the parent.
	setTerm: function(term){
		this.setState({
			searchTerm: term
		})
	},

	setStartYear: function(startYear){
		this.setState({
			searchStartYear: startYear
		});
	},

	setEndYear: function(endYear){
		this.setState({
			searchEndYear: endYear
		});
	},



	// If the component changes (i.e. if a search is entered)... 
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.searchTerm != this.state.searchTerm || prevState.searchStartYear != this.state.searchStartYear || prevState.searchEndYear != this.state.searchEndYear){
			// console.log("UPDATED");

			// Run the query for the address
			helpers.runQuery(this.state.searchTerm, this.state.searchStartYear, this.state.searchEndYear)
				.then(function(data){
					if (data != this.state.results)
					{
						// console.log("Results", data);

						this.setState({
							results: data
						})

						// console.log("This should be an array!");
						// console.log(data);

						// After we've received the result... then post the search term to our history. 
						// helpers.postHistory(this.state.searchTerm, this.state.searchStartYear, this.state.searchEndYear)
						// 	.then(function(data){
						// 		console.log("Updated!");

						// 		// After we've done the post... then get the updated history
						// 		helpers.getHistory()
						// 			.then(function(response){
						// 				console.log("Current History", response.data);
						// 				if (response != this.state.history){
						// 					// console.log ("History", response.data);

						// 					this.setState({
						// 						history: response.data
						// 					})
						// 				}
						// 			}.bind(this))	
						// 	}.bind(this)
						// )
					}
				}.bind(this))
				
			}
	},

	// The moment the page renders get the History
	componentDidMount: function(){

		// Get the latest history.
		helpers.getHistory()
			.then(function(response){
				if (response != this.state.history){
					// console.log ("History", response.data);

					this.setState({
						history: response.data
					})
				}
			}.bind(this))
	},

	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">New York Times Article Scrubber</h2>
						<p className="text-center"><em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em></p>
					</div>

					<div className="col-md-6">
					
						<Search setTerm={this.setTerm} setStartYear={this.setStartYear} setEndYear={this.setEndYear}/>

					</div>

					<div className="col-md-6">
				
						<Results results={this.state.results} />

					</div>

				</div>

				<div className="row">

					<Saved history={this.state.history}/> 

				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;
