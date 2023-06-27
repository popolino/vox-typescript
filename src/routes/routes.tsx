import Profile from "../features/profile/Profile";
import Users from "../features/users/Users";
import Messenger from "../features/messenger/Messenger";
import NotFoundPage from "../components/not-found-page/NotFoundPage";
import React from "react";
import Auth from "../features/auth/Auth";
import { withSuspense } from "../hooks/withSuspense/withSuspense";

const ChatPage = React.lazy(() => import("../features/chat/ChatPage"));
const SuspendedChatPage = withSuspense(ChatPage);

export const routes = [
  {
    path: "profile",
    label: "profile",
    iconId: "profile",
    param: "userId",
    display: false,
    showOnMobile: true,
    public: false,
    component: <Profile />,
  },
  {
    path: "auth",
    label: "",
    iconId: "",
    param: "",
    display: false,
    showOnMobile: false,
    public: true,
    component: <Auth />,
  },

  {
    path: "profile",
    label: "profile",
    iconId: "profile",
    param: "",
    display: false,
    showOnMobile: false,
    public: false,
    component: <Profile />,
  },
  {
    path: "users",
    label: "users",
    iconId: "friends",
    param: "",
    display: true,
    showOnMobile: true,
    public: false,
    component: <Users />,
  },
  {
    path: "messenger/*",
    label: "messenger",
    iconId: "messenger",
    param: "",
    display: false,
    showOnMobile: false,
    public: false,
    component: <Messenger />,
  },
  {
    path: "chat",
    label: "chat",
    iconId: "chat",
    param: "",
    display: true,
    showOnMobile: false,
    public: false,
    component: <SuspendedChatPage />,
  },
  {
    path: "messenger",
    label: "messenger",
    iconId: "messenger",
    param: "",
    display: true,
    showOnMobile: true,
    public: false,
    component: <Messenger />,
  },

  {
    path: "communities",
    label: "communities",
    iconId: "communities",
    param: "",
    display: true,
    showOnMobile: false,
    public: false,
    component: <NotFoundPage />,
  },
  {
    path: "music",
    label: "music",
    iconId: "music",
    param: "",
    display: true,
    showOnMobile: true,
    public: false,
    component: <NotFoundPage />,
  },
  {
    path: "videos",
    label: "videos",
    iconId: "videos",
    param: "",
    display: true,
    showOnMobile: true,
    public: false,
    component: <NotFoundPage />,
  },
  {
    path: "feed",
    label: "feed",
    iconId: "feed",
    param: "",
    display: true,
    showOnMobile: false,
    public: false,
    component: <NotFoundPage />,
  },
  {
    path: "settings",
    label: "settings",
    iconId: "settings",
    param: "",
    display: true,
    showOnMobile: false,
    public: false,
    component: <NotFoundPage />,
  },
];
