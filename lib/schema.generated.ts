export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Int64: any;
  Time: any;
};

export type AuthOutput = {
  __typename?: 'AuthOutput';
  accessToken: Scalars['String'];
  accessTokenExpiry: Scalars['Int64'];
  refreshToken: Scalars['String'];
  refreshTokenExpiry: Scalars['Int64'];
};

export type CreateUserInput = {
  birthday?: InputMaybe<Scalars['Time']>;
  canSMS?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  id: Scalars['ID'];
};

export type DeleteUserInput = {
  id: Scalars['ID'];
};

export type DeleteUserOutput = {
  __typename?: 'DeleteUserOutput';
  success: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: CreateUserOutput;
  deleteUser: DeleteUserOutput;
  login: AuthOutput;
  refreshToken: AuthOutput;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryUserArgs = {
  input: UserInput;
};

export type UpdateUserInput = {
  addRoles?: InputMaybe<Array<Scalars['String']>>;
  birthday?: InputMaybe<Scalars['Time']>;
  canSMS?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  removeRoles?: InputMaybe<Array<Scalars['String']>>;
};

export type User = {
  __typename?: 'User';
  birthday?: Maybe<Scalars['Time']>;
  canSMS?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Time'];
  createdBy: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
  updatedAt: Scalars['Time'];
  updatedBy: Scalars['ID'];
};

export type UserInput = {
  id: Scalars['ID'];
};
