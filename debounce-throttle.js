function debounce(func, wait) {
	if (typeof func !== 'function') {
	 throw new TypeError('func needs to be a function');
	}

	let timeout; // need a closure to keep this value

	return function(...args) {
		let thisScope = this;

		clearTimeout(timeout); // clearTimeout can accept null

		timeout = setTimeout(function() {
			func.apply(thisScope, args);
		}, wait);
	}
}

function throttle(func, wait) {
	if (typeof func !== 'function') {
	 throw new TypeError('func needs to be a function');
	}

	let timeout;

	return function(...args) {
		let thisScope = this;

		if(!timeout) {
			timeout = setTimeout(function() {
				func.apply(thisScope, args);

				timeout = null;
			}, wait);
		}
	}
}