
function curry(func) {
	if(typeof func !== 'function') {
		throw TypeError('func needs to be a function');
	}

	let extraArgs = Array.prototype.slice.call(arguments, 1);

	return function() {
		let args = extra.concat(Array.prototype.slice.call(arguments, 0));
		func.apply(this, args);
	}
}


function Rectangular(width, length) {
	this.width = width;
	this.length = length;
}

Rectangular.prototype.getArea = function () {
	return this.width * this.length;
}


function Square(size) {
	Rectangular.call(this, size, size);
}

Square.prototype = Object.create(Rectangular.prototype, {
	constructor: {
		writable: true,
		enumberable: false,
		configurable: false,
		value: Square
	}
});

Square.prototype.toString = function() {
	return 'Sqaure: ' + this.width;
}



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

function shuffle(arr) {
	let m = arr.length;
	let i = 0;
	let temp;

	while(m) {
		i = Math.floor(Math.random() * m);
		m--;

		// swap m and i
		temp = arr[i];
		arr[i] = arr[m];
		arr[m] = temp
	}
}











































