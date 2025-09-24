import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import GuideCard from "./GuideCard";

export type BotReply =
  | string
  | {
      title: string;
      summary?: string;
      steps: {
        index: number;
        title: string;
        body: string;
        images: {
          url: string;
          caption?: string;
          alt?: string;
          hotspotAnnotations?: {
            x: number;
            y: number;
            note: string;
          }[];
        }[];
      }[];
    };

export type Message = {
  content: BotReply;
  role: "user" | "bot";
};

type Props = {
  messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onCopyMessage = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
          onCopy={onCopyMessage}
        >
          <div
            className={`max-w-[55%] px-4 py-2 rounded-2xl text-sm shadow
        ${
          message.role === "user"
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        }`}
          >
            {typeof message.content === "string" ? (
              <ReactMarkdown>{message.content}</ReactMarkdown>
            ) : (
              <GuideCard guide={message.content} />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatMessages;
