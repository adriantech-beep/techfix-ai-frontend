import axiosInstance from "./axiosInstance";

export const apiPrompt = async (prompt: string) => {
  const res = await axiosInstance.post("/api/chat/diagnose", {
    conversationId: "user123",
    message: prompt,
  });
  return res.data;
};
