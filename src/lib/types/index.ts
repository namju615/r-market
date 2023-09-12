export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
}

export interface ICountry {
	continent?: Maybe<Scalars['String']['output']>;
	id: Scalars['Int']['output'];
	iso2: Scalars['String']['output'];
	iso3: Scalars['String']['output'];
	local_name?: Maybe<Scalars['String']['output']>;
	name: Scalars['String']['output'];
}

export interface IMember {
	email: Scalars['String']['output'];
	name: Scalars['String']['output'];
	user_id: Scalars['Int']['output'];
}

export interface IPost {
	create_date: Scalars['String']['output'];
	hashtag: Scalars['String']['output'];
	image_url: Scalars['String']['output'];
	member: IMember;
	post_id: Scalars['Int']['output'];
	price: Scalars['Int']['output'];
	status: Scalars['String']['output'];
	title: Scalars['String']['output'];
	update_date: Scalars['String']['output'];
	user_id: Scalars['Int']['output'];
	view_count: Scalars['Int']['output'];
}

export interface IQuery {
	countries: Array<Maybe<ICountry>>;
	country?: Maybe<ICountry>;
	member: IMember;
	post?: Maybe<IPost>;
	posts: Array<Maybe<IPost>>;
}
