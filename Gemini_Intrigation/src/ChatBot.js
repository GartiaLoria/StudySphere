import { useState } from "react";
import { Send, X, MessageCircle } from "lucide-react";
import { getGeminiResponse } from "./geminiService";
import { Filter } from "bad-words";
import { ArrowRight } from "lucide-react";

const filter = new Filter();
filter.addWords(
  "ganda", "bakwas", "chutiya", "harami", "bhosdike", "madarchod", 
  "behenchod", "kuttiya", "kaminey", "nalayak", "ghatiya", "ullu", 
  "bewakoof", "gaand", "lodu", "jhant", "chirkut", "suar", "gadha", 
  "chamaar", "bhangi", "bhadwa", "randi", "kutta", "chutmar", "chut", 
  "lund", "haraamkhor", "kachra", "baklol", "badtameez", "chirkut", 
  "bawasir", "gandi", "fuddu", "chhapri", "bawla", "tatti", "bhikmanga",
  "bhand", "jhantu", "ullu ka pattha", "kamina", "chor", "kutti", 
  "chinal", "kanjar", "gaand mara", "pataka", "chutiyaap", "tharki", 
  "lafanga", "tharki buddha", "kamjor", "tuchha", "namard", "lafandar", 
  "bhojpuri", "bhandwa", "ghodu", "hijra", "nalaayak", "choos le", 
  "chamiya", "dalla", "laundiya", "randi ka baccha", "teri ma ki", 
  "bhan ke takke", "gandi aulaad", "kutta kamina", "gand faad", 
  "chudai", "teri maa ka", "lavde", "suar ka bachcha","mc","bc","MC","BC"
);


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

    let filteredMsg = input.split(" ").map(word => filter.isProfane(word) ? "****" : word).join(" ");
    const userMessage = { text: filteredMsg, sender: "user" };
    setMessages((prev) => [...prev.slice(-9), userMessage]);
    setInput("");
    setLoading(true);

    try {
      const botResponse = await getGeminiResponse(filteredMsg);

      // Clean and format the bot response
      const formattedResponse = formatBotResponse(botResponse);

      setMessages((prev) => [...prev.slice(-9), { text: botResponse, sender: "bot" }]);
  } catch (error) {
    setMessages((prev) => [...prev.slice(-9), { text: "Error fetching response", sender: "bot" }]);
  } finally {
    setLoading(false);
    }
  };

  const formatBotResponse = (response) => {
    // Remove the unwanted markdown symbols like **
    const cleanedResponse = response.replace(/\*\*/g, ""); // Remove all the ** symbols for bold
  
    // Format the bold words by wrapping them in <strong> tags
    const formattedResponse = cleanedResponse.replace(/(\*\*([^\*]+)\*\*)/g, (match, p1, p2) => {
      return `<strong class="font-bold">${p2}</strong>`; // Wrap bold content in <strong> tag
    });
  
    // Split the response into bullet points by detecting lines starting with bullet points (•)
    const points = formattedResponse.split("\n").map((line, index) => {
      if (line.trim() !== "") {
        if (line.startsWith("•")) {
          line = line.replace(/^•\s*/, ""); // Remove the bullet symbol
          return `<li key=${index} class="mb-2">• ${line.trim()}</li>`; // Bullet point
        } else {
          return `<li key=${index} class="mb-2">${line.trim()}</li>`; // Normal list item
        }
      }
      return null;
    }).filter(Boolean); // Remove null values
  
    return `<ul class="list-disc pl-6 text-white">${points.join("")}</ul>`; // Wrap in unordered list
  };
  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="fixed bottom-0 right-0 w-2/6 h-full bg-black text-white shadow-lg rounded-xl border border-gray-700 flex flex-col">
          <div className="bg-gray-900 text-white p-3 text-lg font-semibold flex justify-between items-center">
            <span>How can I help you?</span>
            <button onClick={toggleChat} className="text-white"><ArrowRight size={20} /></button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto space-y-2 custom-scroll bg-gray-800">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 max-w-[75%] rounded-lg text-sm flex ${
                  msg.sender === "user" ? "bg-green-500 text-white ml-auto" : "bg-gray-700 text-white"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }} // Render HTML content
              />
            ))}
            {loading && <div className="text-gray-400 text-sm">Typing...</div>}
          </div>

          <div className="flex border-t border-gray-600 p-2 bg-gray-900 items-center">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-600 rounded-full bg-gray-700 text-white focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage} className="bg-green-500 text-white p-2 rounded-full ml-2 flex items-center justify-center">
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button onClick={toggleChat} className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600">
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
