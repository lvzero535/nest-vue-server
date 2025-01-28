export {};
declare global {
  interface IAuthUser {
    uid: string;
    username: string;
    roleIds: string[];
    roleNames: string[];
  }
}
