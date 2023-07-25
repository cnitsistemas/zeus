export enum Access {
  access_token = "access_token",
}

declare module "next-auth" {
  interface User {
    access_token: Access;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
