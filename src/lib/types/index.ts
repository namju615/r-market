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

export interface IChatMessage {
	contents: Scalars['String']['output'];
	create_date: Scalars['String']['output'];
	message_id: Scalars['Int']['output'];
	room_id: Scalars['Int']['output'];
	user_id: Scalars['Int']['output'];
}

export interface IChatMessageForm {
	contents: Scalars['String']['input'];
	room_id: Scalars['Int']['input'];
	user_id: Scalars['Int']['input'];
}

export interface ICountry {
	continent?: Maybe<Scalars['String']['output']>;
	id: Scalars['Int']['output'];
	iso2: Scalars['String']['output'];
	iso3: Scalars['String']['output'];
	local_name?: Maybe<Scalars['String']['output']>;
	name: Scalars['String']['output'];
}

export interface IGetChatMessage {
	contents: Scalars['String']['output'];
	create_date: Scalars['String']['output'];
	name: Scalars['String']['output'];
	room_id: Scalars['Int']['output'];
	user_id: Scalars['Int']['output'];
	user_image?: Maybe<Scalars['String']['output']>;
}

export interface IGetRoomList {
	last_message?: Maybe<Scalars['String']['output']>;
	last_message_date?: Maybe<Scalars['String']['output']>;
	post_id: Scalars['Int']['output'];
	post_title?: Maybe<Scalars['String']['output']>;
	product_image?: Maybe<Scalars['String']['output']>;
	room_id: Scalars['Int']['output'];
	user_list: Array<IUserList>;
}

export interface IMutation {
	addChatMessage: IChatMessage;
}

export interface IMutationAddChatMessageArgs {
	chat: IChatMessageForm;
}

export interface IQuery {
	countries: Array<Maybe<ICountry>>;
	country?: Maybe<ICountry>;
	getChatMessage?: Maybe<Array<IGetChatMessage>>;
	getRoomList?: Maybe<Array<Maybe<IGetRoomList>>>;
}

export interface IQueryGetChatMessageArgs {
	id?: InputMaybe<Scalars['Int']['input']>;
}

export interface IQueryGetRoomListArgs {
	id?: InputMaybe<Scalars['Int']['input']>;
}

export interface IUserList {
	name: Scalars['String']['output'];
	user_id: Scalars['Int']['output'];
	user_image?: Maybe<Scalars['String']['output']>;
}
