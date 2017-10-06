// next Day

Date.prototype.nextDay = funciton() {
	let today = this.getDate();

	return new Date(this.setDate(today + 1));
}