export interface IResultAuth {
  id: string;
  username: string;
  active: boolean;
  createAt: string;
  updateAt: string;
  token: string;
}

export interface IFormLogin {
  username: string;
  password: string;
}
