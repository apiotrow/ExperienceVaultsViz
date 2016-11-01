document.addEventListener('DOMContentLoaded', function () {

	//to render old visualizations
	var vizzes = {
		bargraphs1: require('./eevv-bargraphs1.js'),
		circleexperiment: require('./eevv-circleexperiment.js')
	}
	var bargraphs = vizzes.bargraphs1;
	bargraphs.doit();

});