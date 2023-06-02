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
