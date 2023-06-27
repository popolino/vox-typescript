import React, { useEffect, useState } from "react";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { IconButton, TextareaAutosize } from "@mui/material";

type TAddMessageForm = {
  wsChannel: WebSocket | null;
};

const AddMessageForm: React.FC<TAddMessageForm> = ({ wsChannel }) => {
  const [message, setMessage] = useState<string>("");
  const [readyStatus, setReadyStatus] = useState<"pending" | "fulfilled">(
    "pending"
  );
  useEffect(() => {
    let openHandler = () => {
      setReadyStatus("fulfilled");
    };
    wsChannel?.addEventListener("open", openHandler);
    return () => {
      wsChannel?.removeEventListener("open", openHandler);
    };
  }, [wsChannel]);

  const sendMessage = () => {
    if (message === "" || message === " ") return;
    wsChannel?.send(message);
    setMessage("");
  };

  return (
    <div className="text-field-container">
      <div>
        <IconButton>
          <SvgSelector id="clip" />
        </IconButton>
        <TextareaAutosize
          placeholder="Message"
          maxRows="3"
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        />
      </div>
      <div>
        <IconButton
          onClick={sendMessage}
          disabled={!wsChannel || readyStatus !== "fulfilled"}
        >
          <SvgSelector id="send" />
        </IconButton>
        <IconButton>
          <SvgSelector id="image" />
        </IconButton>
      </div>
    </div>
  );
};

export default AddMessageForm;
