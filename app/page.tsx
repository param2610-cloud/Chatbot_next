"use client";
import { useChat } from "ai/react";
import {
  Bot,
  Loader,
  Loader2,
  Menu,
  MoreHorizontal,
  Plus,
  Send,
  User2,
  X,
} from "lucide-react";
import Image from "next/image";
import Markdown from "./component/markdown";
import { ChangeEvent, useState } from "react";
import SelectedImages from "./component/selectedImages";
import Messages from "./component/messages";
import InputForm from "./component/inputForm";
import InputForm2 from "./component/inputForm2";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Home() {
  // const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = 
  const [messages, setmessages] =useState([{role:"user",content:"Hii"},{role:"bot",content:"Hello"}])
  const [loading, setloading] =useState<boolean>(false)
  const [input, setinput] =useState<string>("")
  const handleSubmit= ()=>{
    
  }
  const handleInputChange= ()=>{

  }
   const [Username,SetUsername] = useState<string>("Parambrata Ghosh")

  return (
    <main className=" h-screen w-screen flex justify-center items-center bg-[#202020]">
      
      <div className=" h-full flex flex-col justify-end w-[390px] bg-[#424242]">
        <Messages username={Username} messages={messages} isLoading={loading} />
        <InputForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={loading}
          stop={stop}
          />
          </div>
    </main>
  );
}
