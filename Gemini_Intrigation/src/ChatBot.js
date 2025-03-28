import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { getGeminiResponse } from "./geminiService"; // ✅ Gemini Service Import

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;
    
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const botResponse = await getGeminiResponse(input);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error fetching response", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 text-lg font-semibold flex justify-between">
            <span>How can I help you?</span>
            <button onClick={toggleChat} className="text-white">✖</button>
          </div>

          <div className="h-60 p-3 overflow-y-auto space-y-2 custom-scroll">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 max-w-xs rounded-lg ${
                  msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-500 text-sm">Typing...</div>}
          </div>

          <div className="flex border-t border-gray-300 p-2">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage} className="bg-indigo-500 text-white px-4 rounded-r-lg flex items-center justify-center">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
      <button onClick={toggleChat} className="bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600">
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default ChatBot;
