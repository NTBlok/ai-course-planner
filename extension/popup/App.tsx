import { useState } from "react";

export default function App() {
  const [chat, setChat] = useState([{ role: "assistant", text: "Hi! Would you like me to plan classes for a specific major or time of day?" }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const newChat = [...chat, { role: "user", text: input }];
    setChat(newChat);
    setInput("");

    // Send filters to content script (dummy logic for now)
    const filters = {
      major: input.includes("computer") ? "CMPSC" : "",
      startTime: input.includes("morning") ? "08:00" : "",
      hybrid: input.includes("hybrid"),
    };
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id!, { type: "APPLY_FILTERS", payload: filters });
  };

  return (
    <div className="p-4 w-[320px]">
      <div className="space-y-2 mb-3">
        {chat.map((m, i) => (
          <div key={i} className={m.role === "assistant" ? "text-blue-600" : "text-gray-800"}>
            <b>{m.role === "assistant" ? "AI:" : "You:"}</b> {m.text}
          </div>
        ))}
      </div>
      <input
        className="border p-2 w-full rounded"
        placeholder="Type your preference..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
    </div>
  );
}

