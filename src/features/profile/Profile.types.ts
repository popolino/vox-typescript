export type TPhotos = {
  small: string;
  large: string;
};

export type TUser = {
  id: number;
  name: string;
  status: string;
  photos: TPhotos;
  followed: boolean;
};
export type TProfile = {
  aboutMe?: string;
  userId?: number;
  lookingForAJob?: boolean;
  lookingForAJobDescription?: string;
  fullName?: string;
  photos?: TPhotos;
};
export type TPost = {
  id: number;
  username: string;
  avatar: string;
  online: string;
  postComment: string;
  postPic: File | null | string;
  likes: number;
  comments: number;
  reposts: number;
};

export type TValuesProfileForm = {
  post: string;
};
export type TRegistrationFields = {
  email: string;
  name: string;
  surname: string;
  password: string;
};
