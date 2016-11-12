// Inclue the React library
var React = require('react');

// Include the Router
var Router = require('react-router');
var Route = Router.Route;

//  Include the IndexRoute (catch-all route)
var IndexRoute	= Router.IndexRoute;

// Reference the high-level components
var Main = require('../Components/Main');
var EmptyResults = require('../Components/EmptyResults');
var Results = require('../Components/Children/Results'); 
var Saved = require('../Components/Children/Saved');
var Search = require('../Components/Children/Search');

// Export the Routes
module.exports = (

	/*High level component is the Main component*/
	<Route path='/' component={Main}>

		{/* If user selects Info or Chat show the appropriate component*/}
		<Route path='info' component={Info} />
		<Route path='chat' component={Chat} />

		{/*If user selects any other path... we get the Info Route*/}
		<IndexRoute component={Info} />

	</Route>


);