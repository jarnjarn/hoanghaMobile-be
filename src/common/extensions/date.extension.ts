export {};
declare global {
	interface Date {
		addYears(years: number): Date;
		addMonths(months: number): Date;
		addDays(days: number): Date;
		addHours(hours: number): Date;
		addMinutes(minutes: number): Date;
		addSeconds(seconds: number): Date;
		toFormat(format: string): string;
		compare(date: Date): number;
	}
}
Date.prototype.addYears = function (years: number) {
	return new Date(this.setFullYear(this.getFullYear() + years));
};
Date.prototype.addMonths = function (months: number) {
	return new Date(this.setMonth(this.getMonth() + months));
};
Date.prototype.addDays = function (days: number) {
	return new Date(this.setDate(this.getDate() + days));
};
Date.prototype.addHours = function (hours: number) {
	return new Date(this.setHours(this.getHours() + hours));
};
Date.prototype.addMinutes = function (minutes: number) {
	return new Date(this.setMinutes(this.getMinutes() + minutes));
};
Date.prototype.addSeconds = function (seconds: number) {
	return new Date(this.setSeconds(this.getSeconds() + seconds));
};
Date.prototype.toFormat = function (format: string) {
	let date = this;
	return format.replace(
		/(yyyy|mmmm|mmm|mm|dddd|ddd|dd|hh|nn|ss|a\/p)/gi,
		function (e) {
			let h;
			switch (e.toLowerCase()) {
				case 'yyyy':
					return date.getFullYear();
				case 'mmmm':
					return date.toLocaleString('default', { month: 'long' });
				case 'mmm':
					return date.toLocaleString('default', { month: 'short' });
				case 'mm':
					return (date.getMonth() + 1).toString().padStart(2, '0');
				case 'dddd':
					return date.toLocaleString('default', { weekday: 'long' });
				case 'ddd':
					return date.toLocaleString('default', { weekday: 'short' });
				case 'dd':
					return date.getDate().toString().padStart(2, '0');
				case 'hh':
					return ((h = date.getHours() % 12) ? h : 12)
						.toString()
						.padStart(2, '0');
				case 'nn':
					return date.getMinutes().toString().padStart(2, '0');
				case 'ss':
					return date.getSeconds().toString().padStart(2, '0');
				case 'a/p':
					return date.getHours() < 12 ? 'a' : 'p';
				default:
					return e;
			}
		},
	);
};
Date.prototype.compare = function (date: Date) {
	let d1 = new Date(this.getFullYear(), this.getMonth(), this.getDate());
	let d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	return d1.getTime() - d2.getTime() > 0
		? 1
		: d1.getTime() - d2.getTime() < 0
		? -1
		: 0;
};
