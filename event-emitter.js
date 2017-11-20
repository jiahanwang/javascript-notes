
/*
emitter = new Emitter();

// 1. Support subscribing to events.
sub = emitter.subscribe('event_name', callback);
sub2 = emitter.subscribe('event_name', callback2);

// 2. Support emitting events.
// This particular example should lead to the `callback` above being invoked with `foo` and `bar` as parameters.
emitter.emit('event_name', foo, bar);

// 3. Support unsubscribing existing subscriptions by releasing them.
sub.release(); // `sub` is the reference returned by `subscribe` above

*/

function Emitter() {
	let events = {};

	this.subscribe = function (eventName, callback) {
		if(events[eventName]) {
			events[eventName].push(callback);
		} else {
			events[eventName] = [callback];
		}

		return {
			release: function() {
				let index = events[eventName].indexOf(callback);

				if(index !== -1) {
					events[eventName].splice(index, 1);
				}
			}
		};
	}

	this.emit = function(...args) {
		let eventName = args[0];
		let parameters = args.slice(1);

		if(events[eventName]) {
			events[eventName].forEach(callback => {
				callback.apply(null, parameters);
			})
		}
	}
}
