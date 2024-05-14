import { ImagePlus, Loader2, MoveRight, Plus, Send } from "lucide-react";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import SelectedImages from "./selectedImages";
import { ChatRequestOptions } from "ai";

type Props = {
  handleInputChange: ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => void;
  handleSubmit: ( e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined ) => void;
  input: string;
  isLoading: boolean;
  stop: () => void
};

const InputForm = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  stop
}: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const imagePromises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      const reader = new FileReader();

      imagePromises.push(
        new Promise<string>((resolve, reject) => {
          
          reader.onload = (e) => {
            const base64String = e.target?.result?.toString();
            
            resolve(base64String as string);
          };
          
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
      );
    }

    try {
      const base64Strings = await Promise.all(imagePromises);
      
      setImages((prevImages: string[]) => {
        
        const updatedImages: string[] = [
          ...prevImages,
          ...(base64Strings as string[]),
        ];
        
        return updatedImages;
      });
    } catch (error) {
      console.error("Error reading image:", error);
    }
  };
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      handleSubmit(event, {
      data: {
        images: JSON.stringify(images),
      },
    });
  }}>

  <div className="parent flex-grow flex flex-col bg-black text-white m-2">
    <div className="Input_field flex space-x-4 justify-center items-center bg-white  text-black rounded-md p-2">
      <input
        type="text"
        placeholder={isLoading ? "Generating . . ." : "Type your prompt here..."}
        value={input}
        disabled={isLoading}
        onChange={handleInputChange}
        className="flex-grow border-none focus:outline-none"
        />
      <div>
        <input
          className="hidden"
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageSelection}
          />
        <ImagePlus
        className="text-[#929292] cursor-pointer"
        onClick={() => document.getElementById("fileInput")?.click()}
        />
      </div>
      <button
        type="submit"
        className="rounded-md shadow-md border flex flex-row justify-center items-center text-white bg-[#51DA4C]"
        >
        {isLoading ? (
          <Loader2
          onClick={stop}
          className="p-3 h-10 w-10  animate-spin"
          />
      ) : (
          <MoveRight className="p-3 h-10 w-10   text-white rounded-md" />
      )}
      </button>
    </div>
    <div className="previewflied flex"></div>
  </div>
</form>
  );
};

export default InputForm;
