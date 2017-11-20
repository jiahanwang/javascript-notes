function mixin(obj1, obj2) {
	if(Object.getOwnPropertyDescriptor) {
		Object.getOwnPropertyNames(obj2).forEach(function(property) {
			Object.defineProperty(obj1, property, Object.getOwnPropertyDescriptor(obj2, property));
		});
	} else {
		for(var property in obj2) {
			if(obj2.hasOwnProperty(property)) {
				obj1[property] = obj2[property];
			}
		}
	}
}



function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}

// inherit one class
MyClass.prototype = Object.create(SuperClass.prototype, {
	constructor: {
		writable: true,
		enumberable: false,
		configurable: false,
		value: MyClass
	}
});

// mixin another
Object.assign(MyClass.prototype, OtherSuperClass.prototype);


MyClass.prototype.myMethod = function() {
  // do a thing
};