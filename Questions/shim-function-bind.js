Function.prototype.bind = Function.prototype.bind || function(context) {
	var self = this;

	return function() {
		self.apply(context, arguments);
	}
}