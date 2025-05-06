import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: newMessages,
      }),
    }).then((r) => r.json());

    setMessages([...newMessages, res.choices[0].message]);
  }

  return (
    <>
      {/* FAB */}
      <Button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-2xl z-50"
      >
        💬
      </Button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-28 right-6 w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.map((m, i) => (
              <p
                key={i}
                className={
                  m.role === "user" ? "text-right font-medium" : "text-left"
                }
              >
                {m.content}
              </p>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 border-t flex space-x-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-sm"
              placeholder="Demande-moi quelque chose..."
            />
            <Button type="submit" className="px-3 py-2">
              ➤
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
