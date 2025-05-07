import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, SendHorizonal } from "lucide-react"

type ChatRole = "user" | "assistant"
type Message  = { role: ChatRole; content: string }

const ChatBot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const next: Message[] = [...messages, { role: "user", content: input }]
    setMessages(next)
    setInput("")
    setLoading(true)

    const data = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    }).then((r) => r.json())

    setLoading(false)

    if (data.error) {
      setMessages([
        ...next,
        { role: "assistant", content: `⚠️ Erreur : ${data.error.message}` },
      ])
      return
    }

    const assistantMsg: Message = {
      role: "assistant",
      content: data.choices[0].message.content.trim(),
    }
    setMessages([...next, assistantMsg])
  }

  return (
    <>
      {/* FAB */}
      <Button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full p-0 shadow-2xl"
      >
        💬
      </Button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-28 right-6 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
            {messages.map((m, i) => (
              <p
                key={i}
                className={
                  m.role === "user"
                    ? "text-right font-medium text-gray-800"
                    : "text-left text-gray-600"
                }
              >
                {m.content}
              </p>
            ))}
            {loading && (
              <p className="flex items-center gap-2 text-gray-400">
                <Loader2 className="animate-spin" size={16} /> Assistant tape…
              </p>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); sendMessage() }} className="flex gap-2 border-t p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-lg bg-gray-100 px-3 py-2"
              placeholder="Pose ta question…"
            />
            <Button type="submit" size="icon" disabled={loading}>
              <SendHorizonal size={16} />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatBot
