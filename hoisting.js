
var test = 1;

function test() {

}

console.log(typeof test);


function outer() {
	var inner;

	function inner() {
		console.log('inner');
	}

	inner();
}

outer();