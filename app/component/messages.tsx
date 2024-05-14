import React from "react";
import Markdown from "./markdown";
import { Bot, User2 } from "lucide-react";
import { Message } from "ai/react";

type Props = {
  messages: Message[],
  isLoading: boolean,
  username:string,
};

const Messages = ({ messages, isLoading, username }: Props) => {
  return (
    <>
    <h1 className="text-2xl bg-[#202020] text-white m-2 p-4 rounded-lg">Chatbot</h1>
    <div
      id="chatbox"
      className=" flex-grow flex flex-col justify-end "
    >
      {messages.map((m, index) => {
        return (
          <div
            className={m.role==="user"?`text-white  m-2 flex flex-col  rounded-lg p-6  justify-end`:`text-white  m-2 flex flex-col  rounded-lg p-6 justify-start`}
          >
            <div className=" flex space-x-3 ">
            {m.role === "user" ? (
              <>
              <User2 className="border-[#B0B0B0] border-2 rounded-full text-[#51DA4C]" size={23}/>
              {username? (
            <div className="text-md text-[#51DA4C]">{username}</div>
            ) : (
              <div className="text-md text-[#51DA4C]">User</div>
            )
            }
              </>
            ) : (
              <>
              <Bot
                className={""}
                />
              <div className="text-md text-[#51DA4C]">Chatbot</div>
                </>
            )}
            
            </div>
            <div className=" mx-10">
            <Markdown text={m.content} />
            </div>
          </div>
        );
      })}
    </div>
      </>
  );
};

export default Messages;
