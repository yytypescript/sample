import React, { useEffect, useRef, useState } from "react";
import { Message, MessageAPI } from "../api/messageAPI";
import { useLoginContext } from "../contexts/login";

export const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messageAPI = useRef<MessageAPI | null>();
  const authContext = useLoginContext();

  useEffect(() => {
    messageAPI.current = new MessageAPI();
    messageAPI.current.onMessage("foo", (message) => {
      setMessages((messages) => messages.concat(message));
    });
    return () => {
      messageAPI.current!.close();
    };
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    await messageAPI.current!.postMessage({
      username: authContext.username!,
      text: message,
      channelId: "foo",
    });
  };

  return (
    <>
      <div className="chatContainer">
        <div className="chatMessages">
          {messages.map((message) => (
            <div key={message.messageId}>
              {message.username}: {message.text}
            </div>
          ))}
        </div>
        <div className="chatForm">
          <form className="chatFormContainer" onSubmit={submit}>
            <input
              className="chatFormInput"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input
              className="chatFormSubmitButton"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};
