import { Sparkles, X } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import Chat from "./chat";

export default function ChatContent() {
  return (
    <>
      <ChatHeader />
      <Chat />
    </>
  );
}

function ChatHeader() {
  return (
    <div className="flex items-center justify-between border-neutral-200 py-2 pl-4 pr-2">
      <h3 className="flex items-center font-semibold text-neutral-800">
        <Sparkles className="mr-2" strokeWidth={1.8} size={20} />
        Chatting with AI
      </h3>
      <div className="flex items-center gap-x-2">
        <PopoverClose asChild>
          <Button variant="ghost" size="icon">
            <X strokeWidth={1.6} size={20} className="text-neutral-700" />
          </Button>
        </PopoverClose>
      </div>
    </div>
  );
}
