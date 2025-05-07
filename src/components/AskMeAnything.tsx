import { useState, useRef, useEffect, FormEvent } from "react"
import { MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AIBadge from "@/components/AIBadge"

type Role = "user" | "assistant"
interface Message {
  content: string
  role: Role
}

export default function AskMeAnything() {
  /* ───────────────── state ───────────────── */
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        "Bonjour ! Je suis votre guide IA sur les systèmes multi‑agents. Comment puis‑je vous aider ?",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  /* ───────────────── auto‑scroll ───────────────── */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages])

  /* ───────────────── envoi message ───────────────── */
  async function handleSend(e: FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    // ajoute message utilisateur
    const next = [...messages, { content: input, role: "user" as Role }]
    setMessages(next)
    setInput("")
    setLoading(true)

    /* appel backend */
    const raw = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    }).catch((err) => {
      return { ok: false, statusText: err.message } as Response
    })

    let data: any = {}
    try {
      data = raw.ok ? await raw.json() : {}
    } catch {
      /* ignore json parse error */
    }
    setLoading(false)

    /* gestion erreur */
    if (!raw.ok || data.error || !data.choices?.[0]?.message?.content) {
      const msg =
        data?.error?.message ||
        `Erreur HTTP ${raw.status ?? ""} ${raw.statusText ?? ""}`.trim()
      setMessages([
        ...next,
        { role: "assistant", content: `⚠️ ${msg}` },
      ])
      return
    }

    /* réponse assistant OK */
    setMessages([
      ...next,
      { role: "assistant", content: data.choices[0].message.content.trim() },
    ])
  }

  /* ───────────────── UI ───────────────── */
  return (
    <>
      {/* fenêtre chat */}
      <div className={`chat-container ${open ? "open" : ""}`}>
        {/* header */}
        <div className="flex items-center justify-between bg-electric-blue p-4 text-white">
          <h3 className="font-medium">Ask Me Anything</h3>
          <button onClick={() => setOpen(false)} className="hover:text-gray-200">
            <X size={18} />
          </button>
        </div>

        {/* messages */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto p-4 text-sm"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  m.role === "user"
                    ? "bg-electric-blue text-white"
                    : "bg-gray-100"
                }`}
              >
                <p>{m.content}</p>
                {m.role === "assistant" && <AIBadge />}
              </div>
            </div>
          ))}
          {loading && (
            <p className="text-gray-400">
              Assistant tape<span className="animate-pulse">…</span>
            </p>
          )}
        </div>

        {/* input */}
        <form onSubmit={handleSend} className="flex gap-2 border-t p-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question…"
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="ghost" disabled={loading}>
            <Send size={18} />
          </Button>
        </form>
      </div>

      {/* bouton flottant */}
      <div className="floating-button" onClick={() => setOpen(true)}>
        <MessageCircle size={24} />
      </div>
    </>
  )
}
