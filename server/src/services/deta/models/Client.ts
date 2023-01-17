export interface Client {
	key: string; // ip
	salt: string;
	lastOnlineTimestamp: number;
}
