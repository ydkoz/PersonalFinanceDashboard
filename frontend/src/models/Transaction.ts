export interface Transaction {
	id?: string;
	userid: string;
	amount: number;
	date: string;
	type: string;
	category: string;
	description?: string;
}