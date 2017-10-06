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