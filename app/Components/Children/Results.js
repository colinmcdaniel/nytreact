// Include React 
var React = require('react');

// This is the results component
var Results = React.createClass({

	// Here we render the function
	render: function(){

		console.log("CHECK THIS");
		console.log(this.props.results);

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Top Articles</h3>
				</div>
				<div className="panel-body text-center">

						<h1>Title:</h1>

						{/* Here we use a map function to loop through an array in JSX*/}
						{this.props.results.map(function(search, i)
							{
								return <p key={i}>{search.title} <br /> {search.date} <br /> {search.url}</p>
							}
						)}

				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Results;