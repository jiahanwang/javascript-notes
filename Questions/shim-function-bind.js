Function.prototype.bind = Function.prototype.bind || function(context) {
	var self = this; // this refers to the function itself

	return function() {
		self.apply(context, arguments); // apply accepts an array
	}
}