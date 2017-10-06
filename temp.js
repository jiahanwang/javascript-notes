
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


function debounce(func, limit) {
	let id;

	return function() {
		let args = Array.prototype.slice(arguments);
		let that = this;

		clearTimeout(id);

		id = setTimeout(function() {
			func.apply(that, args);
		}, limit);
	}
}

function throttle(func, limit) {
	let id;

	return function(...args) {
		let that = this;

		if(!id) {
			id = setTimeout(function() {
				func.apply(that, args);

				id = null;
			}, limit);
		}
	}
}


function Rectangular(width, height) {
	this.width = width;
	this.height = height;
}

Rectangular.prototype.getArea = function () {
	return this.width * this.height;
}

function Sqaure(width) {
	Rectangular.call(this, width, width);
}

Sqaure.prototype = Object.create(Rectangular.prototype, {
	constructor: {
		enumberable: false,
		configurable: false,
		writable: true,
		value: Square
	}
})













































function Rectangular(width. length) {
	this.width = width;
	this.length = length;
}

Rectangular.prototype.getArea = function() {
	return this.width * this.length;
}

function Square(size, size) {
	Rectangular.call(this, size, size);
}

Square.prototype = Object.create(Rectangular.prototype, {
	constructor: {
		configurable: false,
		enumberable: false,
		value: Square,
		writable: true
	}
});


function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}

// inherit one class
MyClass.prototype = Object.create(SuperClass.prototype);
// mixin another
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// re-assign constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
  // do a thing
};

function debounce(func, time) {
	if(typeof func !== 'function') {
		throw new TypeError('func needs to be a function');
	}

	if(typeof time !== 'number') {
		throw new TypeError('time needs to be a number');
	}

	let id;

	return function() {
		clearTimeout(id);

		let that = this;
		let args = Array.prototype.slice.call(arguments);

		id = setTimeout(function() {
			func.call(that, args);
		}, time);
	}
}

function debounce(func, time) {
	if(typeof func !== 'function') {
		throw new TypeError('func needs to be a function');
	}

	if(typeof time !== 'number') {
		throw new TypeError('time needs to be a number');
	}

	let id == null;

	return function() {

		let that = this;
		let args = Array.prototype.slice.call(arguments);

		if(id === null) {
			id = setTimeout(function() {
				func.call(that, args);
				id = null
			}, time);
		}
	}
}
