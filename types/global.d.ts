export {};
declare global {
  interface IAuthUser {
    uid: number;
    username: string;
    roleIds: number[];
  }
}
