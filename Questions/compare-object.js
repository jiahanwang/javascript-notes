function isEqualObject(objectA, objectB) {
	if(!isObject(objectA) || !isObject(objectB)) {
		throw new TypeError('This function only accepts object');
	}

	let aNames = Object.getOwnPropertyNames(objectA);
	let bNames = Object.getOwnPropertyNames(objectB);

	if(aNames.length !== bNames.length) {
		return false;
	}

	for(let i = 0, len = aNames.length; i < len; i++) {
		if(objectA[aNames[i]] !== objectB[aNames[i]]) {
			return false;
		}
	}

	return true;
}

function isObject(obj) {
	return obj !== null && typeof obj === 'object' || typeof obj === 'function';
}