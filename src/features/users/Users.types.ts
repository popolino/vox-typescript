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
