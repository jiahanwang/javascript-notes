Currying refers to the process of transforming a function with multiple arity into the same function with less arity


```javascript
function curriedFunction(func) {
	var args = Array.prototype.slice.call(arguments, 1);

	return function() {
		func.apply(this, args.concat(Array.prototype.slice.call(arguments)))
	}
}
```

Extend Function core object
```javascript
Function.prototype.curry = function() {
	var args = Array.prototype.slice.call(arguments);
	var that = this;

	return function() {
		return that.apply(null, args.concat(Array.prototype.slice.call(arguments)));
	};
}
```

Currying node.js functions can allow for sequential and parallel I/O processing of multiple files, much like the async library for node.js.

```javacsript
var readA = curriedReadFile(pathA);
var readB = curriedReadFile(pathB);

readA(function(err, dataA) {
	readB(function(err, dataB) {
		if(err) {
			throw err;
		}

		// do something with the data
	})
});
```