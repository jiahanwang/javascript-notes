// suppose getJSON return a promise
// reqs is an array with data segements

// Creating a sequence
function getAsync(data) {
	console.log('Request received: ' + data);

	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			console.log('Resolved: ' + data);
			resolve(data + '');
		}, (Math.floor(Math.random() * 4) + 1) * 2000);
	})
}

// data has limit
function getData(data, dataLimit) {
	// truck data
	let requestData = [];

	while(data.length > 0) {
		let item = [];

		for(let i = 0; i < dataLimit && data.length > 0; i++) {
			item.push(data.shift());
		}

		requestData.push(item);
	}

	let promises = requestData.map(getAsync);
	let res = [];

	return promises.reduce(function(sequence, currPromise) {
		return sequence.then(function() {
			// wait for the sequence
			return currPromise;
		}).then(function(response) {
			res.push(response);

			return res;
		});
	}, Promise.resolve());
}

// you can only send at most limit requests at the same time
function getDataWithRequestLimit(data, reqLimit) {
	let promises = [];
	let res = [];

	function chainedPromise(promise) {
		return promise.then(function(response) {
			res.push(response);

			if(data.length !== 0) {
				return chainedPromise(getAsync(data.shift()));
			}

			return res;
		})
	}

	for(let i = 0; i < reqLimit && data.length > 0; i++) {
		promises.push(chainedPromise(getAsync(data.shift())));
	}

	return promises.reduce(function(sequence, currPromise) {
		return sequence.then(function() {
			return currPromise;
		});
	}, Promise.resolve());
}
