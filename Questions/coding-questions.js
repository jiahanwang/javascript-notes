// Verifty a prime number

function isPrimeNumber(num) {
	if (typeof num !== 'number' || num <= 0 || num % 2 === 0) {
		return false;
	}

	var divisor = 3;

	while(divisor < n) {
		if (n % divisor++ === 0) {
			return false;
		}

	}

	return true;
}