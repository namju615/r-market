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
	manager_flag?: Maybe<Scalars['Boolean']['output']>;
	name: Scalars['String']['output'];
	notification_flag?: Maybe<Scalars['Boolean']['output']>;
	profile_image_url?: Maybe<Scalars['String']['output']>;
	score?: Maybe<Scalars['Int']['output']>;
	user_id?: Maybe<Scalars['ID']['output']>;
	uuid?: Maybe<Scalars['String']['output']>;
}

export interface IMemberInput {
	email: Scalars['String']['input'];
	name: Scalars['String']['input'];
	profile_image_url?: InputMaybe<Scalars['String']['input']>;
	uuid: Scalars['String']['input'];
}

export interface IMutation {
	addMember: IMember;
	createToken?: Maybe<IToken>;
	subscribe?: Maybe<ITopic>;
	unsubscribe?: Maybe<ITopic>;
	updateToken?: Maybe<IToken>;
}

export interface IMutationAddMemberArgs {
	member: IMemberInput;
}

export interface IMutationCreateTokenArgs {
	input: ITokenInput;
}

export interface IMutationSubscribeArgs {
	input: ITopicInput;
}

export interface IMutationUnsubscribeArgs {
	input: ITopicInput;
}

export interface IMutationUpdateTokenArgs {
	input: ITokenInput;
}

export interface IQuery {
	countries: Array<Maybe<ICountry>>;
	country?: Maybe<ICountry>;
	latestToken?: Maybe<IToken>;
	member?: Maybe<IMember>;
	tokens?: Maybe<Array<Maybe<IToken>>>;
	topicWithToken?: Maybe<ITopicsWithToken>;
}

export interface IQueryLatestTokenArgs {
	user_id: Scalars['Int']['input'];
}

export interface IQueryMemberArgs {
	uuid: Scalars['String']['input'];
}

export interface IQueryTokensArgs {
	user_id: Scalars['Int']['input'];
}

export interface IQueryTopicWithTokenArgs {
	token_id: Scalars['Int']['input'];
	user_id: Scalars['Int']['input'];
}

export interface IToken {
	created_at: Scalars['String']['output'];
	token_id: Scalars['Int']['output'];
	token_value: Scalars['String']['output'];
	updated_at: Scalars['String']['output'];
	user_id: Scalars['Int']['output'];
}

export interface ITokenInput {
	token_value: Scalars['String']['input'];
	user_id: Scalars['Int']['input'];
}

export interface ITopic {
	created_at: Scalars['String']['output'];
	token_id: Scalars['Int']['output'];
	topic_id: Scalars['Int']['output'];
	topic_name: Scalars['String']['output'];
	updated_at: Scalars['String']['output'];
	use_yn: Scalars['String']['output'];
	user_id: Scalars['Int']['output'];
}

export interface ITopicInput {
	token_id?: InputMaybe<Scalars['Int']['input']>;
	topic_id?: InputMaybe<Scalars['Int']['input']>;
	topic_name?: InputMaybe<Scalars['String']['input']>;
	use_yn?: InputMaybe<Scalars['String']['input']>;
	user_id?: InputMaybe<Scalars['Int']['input']>;
}

export interface ITopicsWithToken {
	token?: Maybe<IToken>;
	topics: Array<Maybe<ITopic>>;
}
