export type TAuth = {
  data: {
    id: number;
    email: string;
    login: string;
  };
};

export type TLogin = {
  email: string;
  password: string;
  rememberMe: boolean;
  captchaUrl: string | null;
};
export type TBaseResponse = {
  resultCode: number;
  messages: string[];
};
export interface ILoginResponse extends TBaseResponse {
  data: {
    userId: number;
  };
}