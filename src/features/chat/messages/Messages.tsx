import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import classes from "../ChatPage.module.scss";
import clsx from "clsx";
import { TChatMessage } from "../ChatPage.types";

type TMessages = {
  wsChannel: WebSocket | null;
};

const Messages: React.FC<TMessages> = ({ wsChannel }) => {
  const [messages, setMessages] = useState<TChatMessage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    containerRef &&
      containerRef.current &&
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
  };
  useEffect(() => {
    scrollToBottom();
    let messageHandler = (event: MessageEvent) => {
      let newMessages = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };

    wsChannel?.addEventListener("message", messageHandler);
    return () => {
      wsChannel?.removeEventListener("message", messageHandler);
    };
  }, [wsChannel, messages]);

  return (
    <div className={clsx(classes.messages, "scrollbar")} ref={containerRef}>
      {messages.map((message: TChatMessage, i) => (
        <Message message={message} key={i} />
      ))}
    </div>
  );
};

export default Messages;
