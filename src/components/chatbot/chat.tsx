import { useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { LeftChatBubble, RightChatBubble } from "./components/chat-bubble";

const messages = [
  { role: "user", content: "Hello" },
  { role: "bot", content: "Hello! How can I help you today?" },
  { role: "user", content: "I need help with my account" },
  {
    role: "bot",
    content: "Sure, I can help you with that. What do you need help with?",
  },
  { role: "user", content: "I need to reset my password" },
  {
    role: "bot",
    content:
      "I can help you with that. Please provide me with your email address.",
  },
];

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <div className="flex max-h-[calc(100dvh-8rem)] flex-col">
      <div className="flex flex-col gap-y-3 overflow-y-auto px-4 pt-3">
        {messages.map((m, index) =>
          m.role === "user" ? (
            <RightChatBubble key={index}>{m.content}</RightChatBubble>
          ) : (
            <LeftChatBubble key={index}>{m.content}</LeftChatBubble>
          ),
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* <form className="flex items-center gap-3 p-4" onSubmit={handleFormSubmit}>
        <Textarea
          autoSize
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="max-h-52 overflow-y-auto"
          onKeyDown={handleKeyPress}
        />
        <Button
          type="submit"
          size="icon"
          className="shrink-0"
          disabled={isLoading}
          ref={submitRef}
        >
          <Icons.Send />
        </Button>
      </form> */}
    </div>
  );
}
