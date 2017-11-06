/*


function rateLimit(func, delay) {...} -> Returns a function
var sendAddItemSafe = rateLimit(sendAddItem, 250);
sendAddItemSafe(“Potatoes”);
sendAddItemSafe(“Green Onions”);
sendAddItemSafe(“Butter”);
sendAddItemSafe(“Sour Cream”);
0                     250                    500                   750
|----------------------|----------------------|----------------------|
<Potatoes                                 X Green Onions                        X Butter                Sour Cream >

X sendAddItemSafe(“Potatoes”);
            X sendAddItemSafe(“Green Onions”);
                                X sendAddItemSafe(“Butter”);
                                 X sendAddItemSafe(“Sour Cream”);
queue 250
queue
[ [“Po”], [“Green”]]

*/


function rateLimit(func, delay) {
	if(typeof func !== 'function' || typeof delay !== 'number' || delay < 0) {
		return false;
	}
	
	let queue = [];
	let id = null;

	return function() {
		let that = this;
		
		if(id === null) {
			// call the func if this is the first time
			func.apply(that, Array.prototype.slice.apply(arguments));
			
			id = setInterval(function() {
				if(queue.length !== 0) {
					let top = queue.shift();
					
					func.apply(top.context, top.args);
				}
				
				if(queue.length === 0) {
					// wait another delay, if there is no more call then clear
					setTimeout(function() {
						if(queue.length === 0) {
							clearInterval(id);
							id = null;
						}
					}, delay);
				}
			}, delay);
		} else {
			queue.push({
				context: that,
				args: Array.prototype.slice.apply(arguments)
			});
		}
	}
}
