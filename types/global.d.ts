export {};
declare global {
  interface IAuthUser {
    uid: number;
    username: string;
    roles: string[];
  }
}
