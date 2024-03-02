"use client";

import { useChat } from "ai/react";
import { useAtomValue } from "jotai";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { postAtom } from "@/lib/atoms";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { LeftChatBubble, RightChatBubble } from "./components/chat-bubble";

// const messages = [
//   { role: "user", content: "Hello" },
//   { role: "bot", content: "Hello! How can I help you today?" },
//   { role: "user", content: "I need help with my account" },
//   {
//     role: "bot",
//     content: "Sure, I can help you with that. What do you need help with?",
//   },
//   { role: "user", content: "I need to reset my password" },
//   {
//     role: "bot",
//     content:
//       "I can help you with that. Please provide me with your email address.",
//   },
// ];

export default function Chat() {
  const fields = useAtomValue(postAtom);

  const {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useChat({
    api: "next-api/chat",
    body: {
      fields,
    },
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const submitRef = useRef<HTMLButtonElement>(null);
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey && !isMobile) {
      event.preventDefault(); // Prevents the default action of inserting a new line
      submitRef.current?.click();
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (diary && !diary.chat_mode) {
    //   setDiary({ ...diary, chat_mode: "normal" });
    // }
    handleSubmit(event);
  };

  const handleImprovePost = () => {
    setInput("Improve description of my post");
    submitRef.current?.click();
  };

  return (
    <div className="flex max-h-[calc(100dvh-8rem)] flex-col">
      {messages.length > 0 ? (
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
      ) : (
        <div className="px-4 pt-3">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={handleImprovePost}
          >
            Improve description of my post
          </Button>
        </div>
      )}
      <form className="flex items-center gap-3 p-4" onSubmit={handleFormSubmit}>
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
          <SendHorizontal />
        </Button>
      </form>
    </div>
  );
}
