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

export type UpdateUserType = Pick<UserType, "name" | "email">;
