import { MessageCircleMore } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ChatContent from "./chat-content";

export function ChatBot() {
  return (
    <Popover>
      <PopoverTrigger className="tablet:bottom-14 tablet:right-14 fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-sm">
        <MessageCircleMore strokeWidth={1.6} className="text-neutral-700" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={-50}
        side="top"
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="z-[1000] w-[30rem] max-w-[calc(100vw-3rem)] p-0"
      >
        <ChatContent />
      </PopoverContent>
    </Popover>
  );
}
