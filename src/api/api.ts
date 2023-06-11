import axios from "axios";
import { TProfile, TUser } from "../features/profile/Profile.types";
import {
  ILoginResponse,
  TAuth,
  TLogin,
} from "../features/Auth/Auth.types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "api-key": "2cc43c23-98fc-4e4e-83f6-44e29e8d10af",
  },
});

export const usersAPI = {
  getUsers(currentPage: number, pageCount: number) {
    return instance.get<TUser[]>(
      `users/?page=${currentPage}&count=${pageCount}`
    );
  },
  getFriends() {
    return instance.get<TUser[]>(`users?friend=true`);
  },
  postFollowUser(id: number) {
    return instance.post(`follow/${id}`);
  },
  deleteFollowUser(id: number) {
    return instance.delete(`follow/${id}`);
  },
};

export const authAPI = {
  getAuth: () => instance.get<TAuth>("auth/me"),
  login(
    email: string,
    password: string,
    rememberMe = false,
    captchaUrl = null
  ) {
    return instance.post<ILoginResponse>(`auth/login`, {
      email,
      password,
      rememberMe,
      captchaUrl,
    });
  },
  logout() {
    return instance.delete("auth/login");
  },
};
export const profileAPI = {
  // getUserProfile: (userId: number) => instance.get<TProfile>(`profile/` + userId),
  getUserProfile(userId: number) {
    return instance.get<TProfile>(`profile/` + userId);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const friendsApi = {
  getFriends: () => axios.get<TUser[]>("users"),
  deleteFriend: (id: string) => axios.delete(`users/${id}`),
  acceptFriend: (id: string) => axios.put(`users/${id}`),
};

// export const usersAPI = {
//   // getUsers: ((currentPage: number, pageCount: number) => axios.get<TUser[]>(`users/?page=${currentPage}&count=${pageCount}`),
//   //
//   // getUsers(currentPage: number, pageCount: number) {
//   //   return axios.get<TUser[]>(`users/?page=${currentPage}&count=${pageCount}`);
//   // },
//   getFriends() {
//     return axios.get<TUser[]>(`users?friend=true`);
//   },
//   getUserProfile(userId: number) {
//     console.warn("obsolete method. Please profileAPI object");
//     return profileAPI.getUserProfile(userId);
//   },
//   postFollowUser(id: number) {
//     return instance.post(`follow/${id}`);
//   },
//   deleteFollowUser(id: number) {
//     return instance.delete(`follow/${id}`);
//   },
// };

// export const profileAPI = {
//   getUserProfile(userId: number) {
//     return instance.get(`profile/` + userId);
//   },
//   getStatus(userId: number) {
//     return instance.get(`profile/status/${userId}`);
//   },
//   updateStatus(status: string) {
//     return instance.put(`profile/status`, { status: status });
//   },
//   savePhoto(photoFile: any) {
//     const formData = new FormData();
//     formData.append("image", photoFile);
//     return instance.put(`profile/photo`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   },
//   saveProfile(profile: any) {
//     return instance.put(`profile/`, profile);
//   },
// };

export const securityAPI = {
  getCaptchaURL() {
    return instance.get("/security/get-captcha-url");
  },
};
