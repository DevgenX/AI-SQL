import { useState } from "react";
import CodeDisplay from "./components/CodeDisplay";
import MessagesDisplay from "./components/MessagesDisplay";

interface ChatData {
  role: string;
  content: string;
}

const App = () => {
  const [input, setInput] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);

  const handleGetQuery = async () => {
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      };
      const response = await fetch("http://localhost:8000/completions", config);
      const data = await response.json();
      const userMessage = {
        role: "user",
        content: input,
      };
      setChat((prevChat) => [...prevChat, data, userMessage]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearChat = () => {
    setInput("");
    setChat([]);
  };

  const filteredUserMessages = chat.filter(
    (message) => message.role === "user"
  );

  const latestCode = chat
    .filter((message) => message.role === "assistant")
    .pop();

  return (
    <div className="app">
      <MessagesDisplay userMessages={filteredUserMessages} />
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <CodeDisplay text={latestCode?.content || "No query available"} />
      <div className="button-container">
        <button id="get-query" onClick={handleGetQuery}>
          Get Query
        </button>
        <button id="clear-display" onClick={handleClearChat}>
          Clear Display
        </button>
      </div>
    </div>
  );
};

export default App;
