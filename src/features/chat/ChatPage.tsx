import React, { useEffect, useState } from "react";
import classes from "./ChatPage.module.scss";
import AddMessageForm from "./add-message-form/AddMessageForm";
import Messages from "./messages/Messages";
import clsx from "clsx";

const ChatPage: React.FC = ({}) => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => {
      setTimeout(createChannel, 3000);
    };
    function createChannel() {
      ws?.removeEventListener("close", closeHandler);
      ws?.close();
      ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
      );
      ws.addEventListener("close", closeHandler);
      setWsChannel(ws);
    }
    createChannel();
    return () => {
      ws.removeEventListener("close", closeHandler);
      ws.close();
    };
  }, []);

  return (
    <div className={clsx("messenger-chat-container", classes.container)}>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  );
};

export default ChatPage;
