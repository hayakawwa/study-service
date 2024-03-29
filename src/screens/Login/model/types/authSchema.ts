export interface UserSchema {
	first_name?: string;
	second_name?: string;
	middle_name?: string;
	email?: string;
	password?: string;
	access_token?: string;
	perms?: number;
}

export interface AuthSchema {
	authData?: UserSchema;
	isAuth?: boolean;
}
