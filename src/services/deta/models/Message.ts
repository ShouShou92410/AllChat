export interface Message {
	key: string; //Number.MAX_SAFE_INTEGER - timestamp. Deta base sorts key in ascending order, this allows me to grab latest (n) records
	timestamp: number;
	from: string;
	message: string;
}
