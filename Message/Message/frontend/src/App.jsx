import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text }),
    });
    setText("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container">
      <h1 className="title">留言板 📝</h1>
      <form className="form" onSubmit={sendMessage}>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="你的名字"
          required
        />
        <input
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="你想说什么..."
          required
        />
        <button className="button" type="submit">
          发送
        </button>
      </form>
      <ul className="message-list">
        {messages.map((msg, i) => (
          <li key={i} className="message-item">
            <strong>{msg.name}</strong>: {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
