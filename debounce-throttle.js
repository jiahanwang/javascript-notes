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

// Simple ES6 version

function debounce(func, limit) {
	let id;

	return function(...args) {
		clearTimeout(id);

		id = setTimeout(() => {
			func.apply(this, args);
		}, limit);
	}
}

function throttle(func, limit) {
	let id = null;

	return function(...args) {
		if(id === null) {
			id = setTimeout(() => {
				func.apply(this, args);
				id = null;
			}, limit);
		}
	};
}
