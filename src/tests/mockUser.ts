import { UserType } from "../misc/User";

export const mockUsersData: UserType[] = [
  {
    id: 1,
    email: "dani@gmail.com",
    password: "123456",
    name: "dani",
    role: "customer",
    avatar:
      "https://gravatar.com/avatar/65aefe59c04ad9fcb2e78d80045dd507?s=400&d=robohash&r=x",
    creationAt: "2024-03-06T11:54:44.000Z",
    updatedAt: "2024-03-06T11:54:44.000Z",
  },
  {
    id: 2,
    email: "dani2@gmail.com",
    password: "123456",
    name: "dani2",
    role: "customer",
    avatar:
      "https://gravatar.com/avatar/65aefe59c04ad9fcb2e78d80045dd507?s=400&d=robohash&r=x",
    creationAt: "2024-03-06T11:54:44.000Z",
    updatedAt: "2024-03-06T11:54:44.000Z",
  },
  {
    id: 3,
    email: "dani3@gmail.com",
    password: "123456",
    name: "dani3",
    role: "customer",
    avatar:
      "https://gravatar.com/avatar/65aefe59c04ad9fcb2e78d80045dd507?s=400&d=robohash&r=x",
    creationAt: "2024-03-06T11:54:44.000Z",
    updatedAt: "2024-03-06T11:54:44.000Z",
  },
];

export const mockToken = {
  access_token: "fakeAccessToken",
  refresh_token: "fakeRefreshToken",
};
