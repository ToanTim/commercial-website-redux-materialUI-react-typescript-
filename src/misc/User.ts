export interface UserType {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

export type UserProfileType = Pick<
  UserType,
  "name" | "email" | "password" | "avatar"
>;

export type UserRegisterType = Pick<
  UserType,
  "email" | "password" | "name" | "avatar" | "role" | "id"
>;

export type UpdateUserType = Pick<UserType, "name" | "email">;

export interface userLoginType {
  email: string;
  password: string;
}

export interface authenticationToken {
  access_token: string;
  refresh_token: string;
}

export interface userError {
  message: string;
  statusCode: number;
}
