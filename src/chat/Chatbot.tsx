import { useState } from "react";
import ChatInput from "./ChatInput";
import { apiPrompt } from "@/services/apiPrompt";
import type { Message } from "./ChatMessages";
import ChatMessages from "./ChatMessages";
import TypingIndicator from "./TypingIndicator";

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [error, setError] = useState("");

  console.log(messages);

  const onSubmit = async (data: { prompt: string }) => {
    try {
      setMessages((prev) => [
        ...prev,
        {
          content: data.prompt,
          role: "user",
          // images: [],
        },
      ]);
      setIsBotTyping(true);
      setError("");
      const result = await apiPrompt(data.prompt);
      setMessages((prev) => [
        ...prev,
        {
          content: result.reply,
          role: "bot",
          // images: result.reply.images.map((img: string) => img) || [],
        },
      ]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.Please try again later");
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 p-4">
        {messages.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400 text-center">
              What can I help you with today with your gadget?
            </p>
          </div>
        ) : (
          <ChatMessages messages={messages ?? {}} />
        )}

        {isBotTyping && <TypingIndicator />}
        {error && <p className="text-red-400">{error}</p>}
      </div>

      <div>
        <ChatInput onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Chatbot;
