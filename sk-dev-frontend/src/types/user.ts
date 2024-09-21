export interface UserData {
	id: string;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
	bio?: string;
	avatar?: string;

	posts: Array<any>;
	likes: Array<any>;
	comments: Array<any>;
	followers: Array<any>;
	following: Array<any>;
	createdAt: string;
	updatedAt: string;
}
